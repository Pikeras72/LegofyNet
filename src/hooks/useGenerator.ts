import { useCallback, useEffect, useReducer, useRef } from 'react';
import { getInferenceEngine, InferenceError } from '../services/inference';
import type { GenerationResult, InferenceErrorCode } from '../services/inference';
import { fileToImageBitmap } from '../services/inference/imageUtils';

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export type ModelState =
  | { status: 'loading'; progress: number }
  | { status: 'ready' }
  | { status: 'error'; code: InferenceErrorCode | 'unknown'; message: string };

export type GenerationState =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'done'; result: GenerationResult }
  | { status: 'error'; message: string };

interface UploadState {
  file: File;
  bitmap: ImageBitmap;
}

interface State {
  model: ModelState;
  upload: UploadState | null;
  uploadError: string | null;
  generation: GenerationState;
}

type Action =
  | { type: 'model-progress'; progress: number }
  | { type: 'model-ready' }
  | { type: 'model-error'; code: InferenceErrorCode | 'unknown'; message: string }
  | { type: 'model-retry' }
  | { type: 'file-selected'; upload: UploadState }
  | { type: 'file-rejected'; message: string }
  | { type: 'file-cleared' }
  | { type: 'generation-started' }
  | { type: 'generation-finished'; result: GenerationResult }
  | { type: 'generation-failed'; message: string }
  | { type: 'generation-reset' };

const initialState: State = {
  model: { status: 'loading', progress: 0 },
  upload: null,
  uploadError: null,
  generation: { status: 'idle' },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'model-progress':
      return state.model.status === 'loading'
        ? { ...state, model: { status: 'loading', progress: action.progress } }
        : state;
    case 'model-ready':
      return { ...state, model: { status: 'ready' } };
    case 'model-error':
      return { ...state, model: { status: 'error', code: action.code, message: action.message } };
    case 'model-retry':
      return { ...state, model: { status: 'loading', progress: 0 } };
    case 'file-selected':
      return { ...state, upload: action.upload, uploadError: null, generation: { status: 'idle' } };
    case 'file-rejected':
      return { ...state, uploadError: action.message };
    case 'file-cleared':
      return { ...state, upload: null, uploadError: null, generation: { status: 'idle' } };
    case 'generation-started':
      return { ...state, generation: { status: 'running' } };
    case 'generation-finished':
      return { ...state, generation: { status: 'done', result: action.result } };
    case 'generation-failed':
      return { ...state, generation: { status: 'error', message: action.message } };
    case 'generation-reset':
      return { ...state, generation: { status: 'idle' } };
  }
}

function toModelError(err: unknown): { code: InferenceErrorCode | 'unknown'; message: string } {
  if (err instanceof InferenceError) return { code: err.code, message: err.message };
  return { code: 'unknown', message: 'Something unexpected happened while loading the model.' };
}

/**
 * Generator state machine. The model starts loading on mount (the user
 * navigated to the generator deliberately); the engine singleton stays warm
 * for the session, so returning to the page is instant.
 */
export function useGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const engine = getInferenceEngine();
  const uploadRef = useRef<UploadState | null>(null);
  uploadRef.current = state.upload;

  const loadModel = useCallback(() => {
    let cancelled = false;
    engine
      .load((progress) => {
        if (!cancelled) dispatch({ type: 'model-progress', progress });
      })
      .then(() => {
        if (!cancelled) dispatch({ type: 'model-ready' });
      })
      .catch((err: unknown) => {
        if (!cancelled) dispatch({ type: 'model-error', ...toModelError(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [engine]);

  useEffect(() => {
    if (engine.isReady()) {
      dispatch({ type: 'model-ready' });
      return;
    }
    return loadModel();
  }, [engine, loadModel]);

  const retryModelLoad = useCallback(() => {
    dispatch({ type: 'model-retry' });
    loadModel();
  }, [loadModel]);

  const selectFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      dispatch({ type: 'file-rejected', message: 'Only JPG and PNG images are supported.' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      dispatch({ type: 'file-rejected', message: 'This image is too large — the maximum size is 10 MB.' });
      return;
    }
    try {
      const bitmap = await fileToImageBitmap(file);
      uploadRef.current?.bitmap.close();
      dispatch({ type: 'file-selected', upload: { file, bitmap } });
    } catch (err) {
      const message =
        err instanceof InferenceError ? err.message : 'This file could not be read as an image.';
      dispatch({ type: 'file-rejected', message });
    }
  }, []);

  const clearFile = useCallback(() => {
    uploadRef.current?.bitmap.close();
    dispatch({ type: 'file-cleared' });
  }, []);

  const generate = useCallback(
    async (modelIndex: number) => {
      const upload = uploadRef.current;
      if (!upload || !engine.isReady()) return;
      dispatch({ type: 'generation-started' });
      try {
        const result = await engine.generate(upload.bitmap, modelIndex);
        dispatch({ type: 'generation-finished', result });
      } catch (err) {
        const message =
          err instanceof InferenceError
            ? err.message
            : 'The generation failed unexpectedly. Please try again.';
        dispatch({ type: 'generation-failed', message });
      }
    },
    [engine],
  );

  const resetGeneration = useCallback(() => dispatch({ type: 'generation-reset' }), []);

  return {
    model: state.model,
    upload: state.upload,
    uploadError: state.uploadError,
    generation: state.generation,
    engineInfo: engine.getInfo(),
    selectFile,
    clearFile,
    generate,
    resetGeneration,
    retryModelLoad,
  };
}

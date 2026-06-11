import { useSearchParams } from 'react-router';
import { Boxes, Cpu, FlaskConical, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useGenerator } from '../hooks/useGenerator';
import { getClassById } from '../data/classes';
import { UploadDropzone } from '../components/generator/UploadDropzone';
import { ClassSelector } from '../components/generator/ClassSelector';
import { ModelLoadCard } from '../components/generator/ModelLoadCard';
import { BlockAssemblyLoader } from '../components/generator/BlockAssemblyLoader';
import { ResultPanel } from '../components/generator/ResultPanel';
import { Button } from '../components/ui/Button';
import { GridBackground } from '../components/ui/GridBackground';

function StepLabel({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-3 font-display text-lg font-semibold">
      <span className="font-mono text-xs tracking-[0.2em] text-primary">{index}</span>
      {title}
    </h2>
  );
}

export function GeneratorPage() {
  usePageTitle('Generator');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedClass = getClassById(searchParams.get('class')) ?? null;
  const {
    model,
    upload,
    uploadError,
    generation,
    engineInfo,
    selectFile,
    clearFile,
    generate,
    resetGeneration,
    retryModelLoad,
  } = useGenerator();

  const selectClass = (id: string) => {
    setSearchParams({ class: id }, { replace: true });
  };

  const canGenerate =
    model.status === 'ready' && upload !== null && selectedClass !== null && generation.status !== 'running';

  const handleGenerate = () => {
    if (selectedClass) void generate(selectedClass.modelIndex);
  };

  let outputPanel;
  if (model.status !== 'ready') {
    outputPanel = <ModelLoadCard model={model} onRetry={retryModelLoad} />;
  } else if (generation.status === 'running') {
    outputPanel = <BlockAssemblyLoader classLabel={selectedClass?.name ?? 'figure'} />;
  } else if (generation.status === 'done' && selectedClass) {
    outputPanel = (
      <ResultPanel
        result={generation.result}
        classId={selectedClass.id}
        classLabel={selectedClass.name}
        isMock={engineInfo.kind === 'mock'}
        slowBackend={engineInfo.slowBackend}
        onRegenerate={handleGenerate}
      />
    );
  } else if (generation.status === 'error') {
    outputPanel = (
      <div className="glass flex h-full min-h-80 flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">
        <span className="rounded-xl bg-danger/10 p-3 text-danger">
          <TriangleAlert className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold">Generation failed</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{generation.message}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleGenerate} disabled={!canGenerate}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button variant="ghost" onClick={resetGeneration}>
            Dismiss
          </Button>
        </div>
      </div>
    );
  } else {
    const hint = !upload
      ? 'Upload an image to begin.'
      : !selectedClass
        ? 'Now pick a target class.'
        : 'Ready — hit Generate!';
    outputPanel = (
      <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-line p-8 text-center">
        <Boxes className="h-10 w-10 text-muted/60" aria-hidden="true" />
        <div>
          <p className="font-display font-medium text-ink/90">Your block figure will appear here</p>
          <p className="mt-1.5 text-sm text-muted">{hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <GridBackground />
      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Synthesis chamber
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Generator</h1>
          <p className="mt-3 text-muted">
            Upload a photo, choose one of the 22 classes and let the Pix2Pix generator rebuild it as a
            block figure — entirely on your device.
          </p>
        </header>

        {engineInfo.kind === 'mock' && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-block/30 bg-block/10 px-4 py-3 text-sm text-amber-200">
            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              <strong>Demo mode:</strong> the mock engine is active (VITE_INFERENCE_ENGINE=mock). Outputs are
              simulated — not real model inference.
            </p>
          </div>
        )}
        {model.status === 'ready' && engineInfo.slowBackend && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-block/30 bg-block/10 px-4 py-3 text-sm text-amber-200">
            <Cpu className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              WebGL is unavailable on this device, so the model runs on the CPU. Generations will be
              noticeably slower.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-8">
            <section aria-labelledby="step-input">
              <StepLabel index="01" title="Input image" />
              <div className="mt-4">
                <UploadDropzone
                  file={upload?.file ?? null}
                  error={uploadError}
                  onSelect={(f) => void selectFile(f)}
                  onClear={clearFile}
                />
              </div>
            </section>

            <section aria-labelledby="step-class">
              <StepLabel index="02" title="Target class" />
              <div className="mt-4">
                <ClassSelector selectedId={selectedClass?.id ?? null} onSelect={selectClass} />
              </div>
            </section>

            <section aria-labelledby="step-generate">
              <StepLabel index="03" title="Synthesize" />
              <div className="mt-4">
                <Button size="lg" className="w-full" disabled={!canGenerate} onClick={handleGenerate}>
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  {generation.status === 'running' ? 'Generating…' : 'Generate'}
                </Button>
                <p className="mt-2.5 text-center text-xs text-muted" aria-live="polite">
                  {model.status === 'loading'
                    ? 'The model is still downloading — you can prepare your input meanwhile.'
                    : selectedClass
                      ? `Conditioning on class vector #${selectedClass.modelIndex} · ${selectedClass.name}`
                      : 'Select a class to enable generation.'}
                </p>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">{outputPanel}</div>
        </div>
      </div>
    </div>
  );
}

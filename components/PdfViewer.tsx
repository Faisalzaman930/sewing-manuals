"use client";

function isPdf(url: string) {
  return url.toLowerCase().includes(".pdf");
}

export default function PdfViewer({ url, title }: { url: string; title: string }) {
  if (isPdf(url)) {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    return (
      <div className="overflow-hidden rounded-lg border border-iron-200">
        <div className="flex items-center justify-between bg-iron-100 px-4 py-2">
          <span className="text-sm font-medium text-iron-700">{title}</span>
          <a
            href={url}
            target="_blank"
            rel="nofollow noreferrer"
            className="rounded bg-steel-700 px-3 py-1 text-xs font-semibold text-white hover:bg-steel-800"
          >
            Download PDF
          </a>
        </div>
        <iframe
          src={viewerUrl}
          className="h-[600px] w-full border-0"
          title={title}
          loading="lazy"
        />
      </div>
    );
  }

  // Non-PDF URL — show a link-out card (manufacturer or ManualsLib page)
  return (
    <div className="rounded-lg border border-iron-200 bg-white p-5">
      <p className="text-sm text-iron-600 mb-3">
        The manual for this model is hosted externally. Click below to view or download it.
      </p>
      <a
        href={url}
        target="_blank"
        rel="nofollow noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-steel-700"
      >
        View {title} →
      </a>
    </div>
  );
}

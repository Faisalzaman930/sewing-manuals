"use client";

export default function PdfViewer({ url, title }: { url: string; title: string }) {
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
          Open / Download PDF
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

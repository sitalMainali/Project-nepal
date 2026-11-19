import { comparison } from "@/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StatusIcon, statusLabel } from "@/components/ui/Icons";

export function Comparison() {
  const cols = comparison.columns;
  return (
    <Section id="compare" labelledBy="compare-title" tone="surface">
      <SectionHeading id="compare-title" eyebrow="Compare" title={comparison.heading} intro={comparison.intro} />

      {/* Desktop / tablet: table */}
      <div className="hidden overflow-hidden rounded-card bg-white ring-1 ring-line md:block" data-fade>
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Comparison of Second Serve Mail, doing it yourself, and a typical big agency. Each cell says Yes, No or Partly.
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[25%] p-4 text-sm font-semibold text-muted">
                Feature
              </th>
              {cols.map((c, i) => (
                <th key={c} scope="col" className={`p-4 font-serif text-lg font-semibold ${i === 0 ? "bg-ink text-cream" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <th scope="row" className="p-4 font-semibold">
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={i} className={`p-4 align-top ${i === 0 ? "bg-ink/[0.04]" : ""}`}>
                    <span className="flex items-start gap-2">
                      <StatusIcon status={cell.status} className="mt-0.5 h-5 w-5 flex-none" />
                      <span>
                        <span className="font-semibold">{statusLabel[cell.status]}</span>
                        {cell.note && <span className="block text-sm text-muted">{cell.note}</span>}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards, one per option */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {cols.map((c, ci) => (
          <section key={c} aria-label={c} className={`rounded-card bg-white p-5 ${ci === 0 ? "ring-2 ring-ink" : "ring-1 ring-line"}`}>
            <h3 className="font-serif text-xl font-semibold">{c}</h3>
            <ul className="mt-3 divide-y divide-line">
              {comparison.rows.map((row) => {
                const cell = row.cells[ci];
                return (
                  <li key={row.label} className="flex items-start gap-3 py-3">
                    <StatusIcon status={cell.status} className="mt-0.5 h-5 w-5 flex-none" />
                    <span>
                      <span className="font-semibold">{row.label}: </span>
                      <span>{statusLabel[cell.status]}</span>
                      {cell.note && <span className="block text-sm text-muted">{cell.note}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}

import Link from 'next/link';
import { ErpAppsGrid } from './components/erp-apps-grid';

export const metadata = {
  title: 'ERP sections · Ontology + AI',
  description:
    'Manufacturing ERP sections on the ontology hub — sales, MRP, inventory, accounting, …',
};

export default function ErpMapPage() {
  return (
    <>
      <h1>Ontology + AI · manufacturing sections</h1>
      <p className="lede">
        Odoo-style tiles for sales, manufacturing, inventory, quality,
        accounting, and more — one <strong>ontology map</strong> and allowlisted
        skills across domains. Demos: start on{' '}
        <Link href="/ontology">full Schema / Process</Link> and{' '}
        <Link href="/integrations">multi-peer edges</Link>, not one module.
      </p>
      <ErpAppsGrid />
    </>
  );
}

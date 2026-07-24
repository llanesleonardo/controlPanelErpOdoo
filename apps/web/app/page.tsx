import { ErpAppsGrid } from './components/erp-apps-grid';

export const metadata = {
  title: 'ERP Map · Control Panel ERP',
  description: 'Odoo-style module grid for ERP control-plane sections',
};

export default function ErpMapPage() {
  return <ErpAppsGrid />;
}

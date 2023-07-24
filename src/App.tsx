import React from 'react';

import Table from './components/Table/Table';
import { TColumn } from './types';

import data from './data.json';

function App() {
  const tableData = data.map((item, index) => ({ NO: String(index + 1), ...item }));

  const column: TColumn[] = [
    { heading: 'NO.', key: 'NO' },
    { heading: 'Issue Type', key: 'issueType' },
    { heading: 'Severity', key: 'severity' },
    { heading: 'Component', key: 'Component' },
    { heading: 'Selector', key: 'selector', withSearch: true },
    { heading: 'URL', key: 'url', withSearch: true, renderCell: ({ value }) => <a href={value}>{value}</a> },
  ];

  return (
    <div>
      <Table data={tableData} column={column} />
    </div>
  );
}

export default App;

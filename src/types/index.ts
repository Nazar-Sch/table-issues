export type ColumnCell = {
  value: string;
};

export type TColumn = {
  heading: string;
  key: string;
  withSearch?: boolean;
  renderCell?: (cell: ColumnCell) => React.ReactNode;
};

export type TSearchQueries = { [key: string]: string }
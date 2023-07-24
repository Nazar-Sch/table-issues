import React, { useMemo, useState } from 'react';

import { ReactComponent as UpDownIcon } from '../../assets/icons/up-down.svg';
import { ReactComponent as UpArrow } from '../../assets/icons/up-arrow.svg';
import { ReactComponent as DownArrow } from '../../assets/icons/down-arrow.svg';
import TextField from '../TextField';
import { TColumn } from '../../types';

import styles from './Table.module.scss';

interface TableProps {
  data: any[];
  column: TColumn[];
}

const Table: React.FC<TableProps> = ({ data, column }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [isSortReverse, setIsSortReverse] = useState<boolean>(false);
  const initialSearchState: { [key: string]: string } = {};
  column.forEach((columnItem) => {
    initialSearchState[columnItem.key] = '';
  });
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>(initialSearchState);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        column.every((columnItem) => {
          const columnValue = item[columnItem.key].toString().toLowerCase();
          const searchQuery = searchQueries[columnItem.key].toLowerCase();

          return columnValue.includes(searchQuery);
        })
      ),
    [data, column, searchQueries]
  );

  const sortedTableData = useMemo(
    () =>
      sortKey
        ? filteredData.sort((a, b) => {
            const valueA = a[sortKey]?.toString().toLowerCase();
            const valueB = b[sortKey]?.toString().toLowerCase();
            return isSortReverse ? (valueB || '').localeCompare(valueA || '') : (valueA || '').localeCompare(valueB || '');
          })
        : filteredData,
    [sortKey, filteredData, isSortReverse]
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setIsSortReverse(!isSortReverse);
    } else {
      setSortKey(key);
      setIsSortReverse(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setSearchQueries({ ...searchQueries, [key]: event.target.value });
  };

  const renderTableHead = () => (
    <thead>
      <tr>
        {column.map((columnItem) => (
          <th key={columnItem.key} className={sortKey === columnItem.key ? styles.header__heading__sorted : styles.header__heading__default}>
            <button onClick={() => handleSort(columnItem.key)} className={styles.header__button}>
              <span>{columnItem.heading}</span>
              {sortKey === columnItem.key ? isSortReverse ? <DownArrow /> : <UpArrow /> : <UpDownIcon />}
            </button>
            {columnItem.withSearch && (
              <TextField type='text' value={searchQueries[columnItem.key]} onChange={(event) => handleSearch(event, columnItem.key)} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => {
    return (
      <tbody>
        {sortedTableData.map((item) => (
          <tr key={item.id} className={styles.body}>
            {column.map((columnItem) => {
              return (
                <td key={columnItem.key} className={styles.body__cell}>
                  <div>{columnItem.renderCell ? columnItem.renderCell({ value: item[columnItem.key] }) : item[columnItem.key]}</div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <table>
      {renderTableHead()}
      {renderTableBody()}
      {sortedTableData.length === 0 && <div className={styles.empty}>Not found</div>}
    </table>
  );
};

export default Table;

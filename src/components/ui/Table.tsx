import { MdEdit, MdDelete } from 'react-icons/md';

interface Column {
  key: string;
  header: string;
  type: 'title' | 'status' | 'category' | 'date' | 'actions';
  className?: string;
}

export interface DataItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: any[] | undefined;
  onEdit?: (item: DataItem) => void;
  onDelete?: (item: DataItem) => void;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300';
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300';
    case 'Scheduled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
  }
};

const getStatusDotColor = (status: string) => {
  switch (status) {
    case 'Published':
      return 'bg-green-500';
    case 'Draft':
      return 'bg-yellow-500';
    case 'Scheduled':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'Development':
      return 'text-primary border-primary/20';
    case 'Design':
      return 'text-purple-400 border-purple-400/20';
    case 'Events':
      return 'text-secondary border-secondary/20';
    default:
      return 'text-gray-400 border-gray-400/20';
  }
};

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  const renderCell = (item: any, column: Column) => {
    switch (column.type) {
      case 'title':
        return (
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors text-sm md:text-base">
              {item.title}
            </span>
            <span className="text-xs text-gray-500 mt-1 truncate max-w-xs">
              {item.description}
            </span>
          </div>
        );
      case 'status':
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(item.status)}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDotColor(item.status)}`}></span>
            {item.status}
          </span>
        );
      case 'category':
        return (
          <span className={`text-xs font-bold border px-2 py-1 rounded ${getCategoryStyles(item.category)}`}>
            {item.category}
          </span>
        );
      case 'date':
        return (
          <span className="text-sm text-gray-500">
            {item.date}
          </span>
        );
      case 'actions':
        return (
          <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              onClick={() => onEdit?.(item)}
            >
              <MdEdit className="text-lg" />
            </button>
            <button
              className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
              onClick={() => onDelete?.(item)}
            >
              <MdDelete className="text-lg" />
            </button>
          </div>
        );
      default:
        return <span>{item[column.key]}</span>;
    }
  };

  return (
    <table className="bg-white/60 dark:bg-surface-dark/40 backdrop-blur-sm rounded-2xl w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-gray-200 dark:border-white/5">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`p-5 text-xs font-bold text-gray-400 uppercase tracking-wider ${column.className || ''}`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-white/5">
        {data?.map((item, index) => (
          <tr key={index} className="group hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            {columns.map((column) => (
              <td key={column.key} className={`p-5 ${column.className || ''}`}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
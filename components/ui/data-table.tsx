'use client'
'use no memo'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import LargeLoaderCircle from '../common/large-loader-circle'
import NoResultSquirrel from '../common/no-result-squirrel'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  visibility?: boolean
  searchPlaceHolder?: string
  rowLength?: number
  searchBarSpace?: boolean
  children?: ReactNode
  onRowClick?: (row: TData) => void
  isLoading?: boolean
  noResultText?: string
}
export default function DataTable<TData, TValue>({
  columns,
  data,
  visibility,
  searchPlaceHolder,
  rowLength = 10,
  searchBarSpace,
  children,
  onRowClick,
  isLoading,
  noResultText = '검색 결과가 없습니다',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      sorting,
      columnVisibility: columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: rowLength,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    autoResetPageIndex: false,
    columnResizeMode: 'onChange',
  })

  return (
    <div className="w-full">
      {searchPlaceHolder && (
        <div className="flex items-center pb-2">
          <div
            className={cn(
              searchBarSpace ? 'w-[calc(100%-114px)]' : 'w-full',
              'relative',
            )}
          >
            <Input
              type="text"
              name="global search"
              placeholder={searchPlaceHolder}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value ?? '')}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
              onClick={() => setGlobalFilter('')}
            >
              <X size={12} />
            </Button>
          </div>

          {children}
        </div>
      )}

      {visibility && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">열선택</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center text-xs md:text-sm"
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[320px] text-center"
                >
                  <LargeLoaderCircle />
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="text-center"
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[320px] text-center"
                  >
                    <NoResultSquirrel
                      text={noResultText}
                      className="flex-col"
                      size="lg"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4">
        <span className="text-sm text-gray-700">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          페이지
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-black"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

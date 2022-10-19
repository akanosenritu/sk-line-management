import {Paper} from "@mui/material"
import {DataGrid, GridColDef, GridToolbar, jaJP} from "@mui/x-data-grid"
import {DetailsButton} from "./DetailsButton"

const columns: GridColDef[] = [
  {
    field: "userId",
    headerAlign: "center",
    headerName: "LINEユーザーID",
    width: 300,
    editable: false,
    align: "center",
  },
  {
    field: "name",
    headerAlign: "center",
    headerName: "氏名",
    width: 200,
    editable: false,
    align: "center",
  },
  {
    field: "phoneNumber",
    headerAlign: "center",
    headerName: "電話番号",
    width: 200,
    editable: false,
    align: "center",
  },
  {
    field: "detailsButton",
    headerAlign: "center",
    headerName: "詳細",
    width: 100,
    editable: false,
    align: "center",
    renderCell: (params) => <DetailsButton lineUserId={params.row.userId} />
  },
]

export const DisplayAccountLinksList = (props: {accountLinks: {userId: string, name: string, phoneNumber: string}[]}) => {
  return <Paper elevation={2} sx={{height: 500, width: "100%"}}>
    <DataGrid
      columns={columns}
      components={{Toolbar: GridToolbar}}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: {debounceMs: 500},
        }
      }}
      rows={props.accountLinks}
      pageSize={100}
      rowsPerPageOptions={[100]}
      localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
      disableSelectionOnClick={true}
    />
  </Paper>
}
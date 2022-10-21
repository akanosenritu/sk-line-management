import {DataGrid, GridColDef, GridToolbar, jaJP} from "@mui/x-data-grid"
import {Box, Paper, Typography} from "@mui/material"
import {DetailsButton} from "./DetailsButton"

const columns: GridColDef[] = [
  {
    field: "lineUserId",
    headerAlign: "center",
    headerName: "LINEユーザーID",
    width: 300,
    editable: false,
    align: "center",
  },
  {
    field: "lineRegistrationDate",
    headerAlign: "center",
    headerName: "LINE登録日",
    width: 100,
    editable: false,
    align: "center",
  },
  {
    field: "registrationNumber",
    headerAlign: "center",
    headerName: "登録番号",
    width: 100,
    editable: false,
    align: "center",
  },
  {
    field: "registrationDate",
    headerAlign: "center",
    headerName: "登録日",
    width: 100,
    editable: false,
  align: "center",
  },
  {
    field: "name",
    headerAlign: "center",
    headerName: "氏名",
    width: 100,
    editable: false,
    align: "center",
  },
  {
    field: "nameKana",
    headerAlign: "center",
    headerName: "氏名 (かな)",
    width: 150,
    editable: false,
    align: "center",
  },
  {
    field: "rank",
    headerAlign: "center",
    headerName: "ランク",
    width: 100,
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
    renderCell: (params) => <DetailsButton lineUserId={params.row.lineUserId} />
  }
]

const rows: any[] = [
]

export const DisplayUsersList = () => {
  return <Box sx={{width: "100%"}}>
    <Box sx={{p: 2}}>
      <Typography variant={"h5"} sx={{borderLeft: "2px solid darkgray", pl: 1, color: "darkgray"}}>LINE公式アカウント お友達リスト</Typography>
    </Box>
    <Paper elevation={2} sx={{height: 500, width: "100%"}}>
      <DataGrid
        columns={columns}
        components={{Toolbar: GridToolbar}}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {debounceMs: 500},
          }
        }}
        rows={rows}
        pageSize={100}
        rowsPerPageOptions={[100]}
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        disableSelectionOnClick={true}
      />
    </Paper>
  </Box>
}
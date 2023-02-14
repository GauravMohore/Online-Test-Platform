import React from "react";
import { DataGrid } from "@mui/x-data-grid";

class GridMaker extends React.Component {
  render() {
    const columns = this.props.columns;

    const rows = this.props.rows;

    console.log(columns)
    console.log(rows)

    return (
      <>
        <div className='grid-style' >
          <DataGrid
            getRowId={(rows) => rows.id}
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </>
    );
  }
}

// export default gridMaker;

// const gridMaker = (data) => {
//   console.log(data);

//   return (
//     <>
//       <DataGrid
//         rows={data}
//         // columns={columns}
//         pageSize={20}
//         getRowId={(data) => data.examID}
//       />
//     </>
//   );
// };

export default GridMaker;

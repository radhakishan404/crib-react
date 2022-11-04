import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import CribsTable from "../../component/CribsTable";
import CribsAdd from "../../component/CribsAdd";

class CribsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  getCribsData() {
    this.props.cribsGetList({ params: this.props.cribs_meta });
  }

  componentDidMount() {
    this.getCribsData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cribs_meta !== this.props.cribs_meta) {
      this.getCribsData();
    }
  }

  handleSearch(val) {
    this.props.setCribsMeta({ meta: { search: val } });
  }

  async handleEdit(id) {
    await this.props.getUniqueCribs(id);
    this.setState({ isModalOpen: true });
  }

  async handleAddCribs(values) {
    await this.props.cribsAdd(values);
    this.setState({ isModalOpen: false });
    this.getCribsData();
  }

  async handleUpdateCribs(values) {
    await this.props.cribsUpdate(values);
    this.setState({ isModalOpen: false });
    this.getCribsData();
  }

  render() {
    const {
      cribs_data_loading,
      cribs_data,
      cribs_meta,
      cribs_data_count,
      setCribsMeta,
    } = this.props;

    return (
      <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Cribs List</Typography>
            <Grid>
              <TextField
                sx={{ marginRight: 2 }}
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="Search here..."
                size="small"
                type={"search"}
                onChange={(e) => this.handleSearch(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => this.setState({ isModalOpen: true })}
              >
                Add Cribs
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CribsTable
              cribs_data={cribs_data}
              cribs_data_loading={cribs_data_loading}
              cribs_meta={cribs_meta}
              cribs_data_count={cribs_data_count}
              setCribsMeta={(d) => setCribsMeta(d)}
              getCribsData={() => this.getCribsData()}
              edit={(id) => this.handleEdit(id)}
            />
          </Grid>
        </Grid>
        <CribsAdd
          open={this.state.isModalOpen}
          close={() => this.setState({ isModalOpen: false })}
          addCribs={(payload) => this.handleAddCribs(payload)}
          updateCribs={(payload) => this.handleUpdateCribs(payload)}
          updateData={this.props.unique_cribs_data}
          is_update={this.props.unique_cribs_data ? true : false}
        />
      </Container>
    );
  }
}

export default CribsContainer;

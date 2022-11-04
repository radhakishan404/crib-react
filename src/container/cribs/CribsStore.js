import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSnackBar, setCribsMeta, cribsGetList, cribsAdd, cribsUpdate, getUniqueCribs } from "../../store/common/commonSlice";

const mapStateToProps = (state) => {
    return {
        cribs_data_loading: state.common.cribs_data_loading,
        add_loading: state.common.add_loading,
        cribs_data: state.common.cribs_data,
        cribs_meta: state.common.cribs_meta,
        cribs_data_count: state.common.cribs_data_count,
        unique_cribs_data: state.common.unique_cribs_data,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setSnackBar,
        setCribsMeta,
        cribsGetList,
        cribsAdd: cribsAdd,
        cribsUpdate: cribsUpdate,
        getUniqueCribs: getUniqueCribs,
    }, dispatch);

const Store = (Container) =>
    connect(mapStateToProps, mapDispatchToProps)(Container);

export default Store;

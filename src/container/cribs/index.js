
import withNavigate from "../../routes/withNavigate";
import CribsContainer from "./CribsContainer";
import CribsStore from "./CribsStore.js";

export default CribsStore(withNavigate(CribsContainer));

import { configureStore } from "@reduxjs/toolkit";
import  trainer from './states/trainer.state'
import modeView from "./states/modeView.state";

export default configureStore({
    reducer:{
        trainer,
        modeView
    }

})

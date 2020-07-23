/* @flow */

import {combineReducers} from "redux"

import Clusters from "./Clusters"
import Errors from "./Errors"
import Handlers from "./Handlers"
import Investigation from "./Investigation"
import Modal from "./Modal"
import Notice from "./Notice"
import Packets from "./Packets"
import Prefs from "./Prefs"
import Spaces from "./Spaces"
import Tabs from "./Tabs"
import View from "./View"
import Viewer from "./Viewer"

export default combineReducers<*, *>({
  errors: Errors.reducer,
  viewer: Viewer.reducer,
  clusters: Clusters.reducer,
  modal: Modal.reducer,
  notice: Notice.reducer,
  handlers: Handlers.reducer,
  tabs: Tabs.reducer,
  investigation: Investigation.reducer,
  view: View.reducer,
  spaces: Spaces.reducer,
  packets: Packets.reducer,
  prefs: Prefs.reducer
})

/* @flow */

import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react"

import {ipcRenderer} from "electron"

import {DebugModal} from "./DebugModal"
import {LeftPane} from "./LeftPane"
import {XDownloadProgress} from "./DownloadProgress"
import {XRightPane} from "./RightPane"
import {XSearchResults} from "./SearchResults/SearchResults"
import {XStatusBar} from "./StatusBar"
import {checkVersions} from "../services/boom"
import {getKey} from "../lib/finding"
import {hasAnalytics} from "../lib/Program"
import {initSpace} from "../flows/initSpace"
import {useResizeObserver} from "./hooks/useResizeObserver"
import BoomGetModal from "./BoomGetModal"
import ColumnChooser from "./ColumnChooser"
import ControlBar from "./ControlBar"
import CurlModal from "./CurlModal"
import EmptySpaceModal from "./EmptySpaceModal"
import ErrorNotice from "./ErrorNotice"
import Handlers from "../state/Handlers"
import Investigation from "../state/Investigation"
import MainHistogramChart from "./charts/MainHistogram/Chart"
import SearchBar from "../state/SearchBar"
import SettingsModal from "./SettingsModal"
import Tab from "../state/Tab"
import TabBar from "./TabBar/TabBar"
import Viewer from "../state/Viewer"
import WhoisModal from "./WhoisModal"
import brim from "../brim"
import useSearchShortcuts from "./useSearchShortcuts"

function useProgress() {
  let {currentTs} = useSelector(Viewer.getStats)
  let [start, end] = useSelector(Tab.getSpan)
    .map(brim.time)
    .map((t) => t.toDate())

  let c = brim.time(currentTs).toDate()

  console.group("render")
  console.log("start", start)
  console.log("curr ", c)
  console.log("end  ", end)
  console.groupEnd()
}
export default function SearchPage() {
  let logsTab = !hasAnalytics(useSelector(SearchBar.getSearchProgram))
  let finding = useSelector(Investigation.getCurrentFinding)
  let renderKey = finding && getKey(finding)
  let results = useResizeObserver()
  let dispatch = useDispatch()
  useSearchShortcuts()
  useProgress()
  useEffect(() => {
    ipcRenderer.send("open-search-window")
    dispatch(initSpace("default"))
    setTimeout(() => dispatch(checkVersions()), 500)
    return () => dispatch(Handlers.abortAll())
  }, [])

  return (
    <div className="search-page-wrapper">
      <div className="search-page">
        <LeftPane />
        <div className="search-page-main">
          <div className="search-page-header">
            <TabBar />
            <ControlBar />
            {logsTab && (
              <div className="search-page-header-charts">
                <MainHistogramChart key={renderKey} />
              </div>
            )}
            <ColumnChooser />
          </div>
          <div className="search-results" ref={results.ref}>
            <XSearchResults
              width={results.rect.width}
              height={results.rect.height}
            />
          </div>
          <XStatusBar />
        </div>
        <XRightPane />
      </div>
      <ErrorNotice />
      <XDownloadProgress />
      <WhoisModal />
      <DebugModal />
      <CurlModal />
      <SettingsModal />
      <EmptySpaceModal />
      <BoomGetModal />
    </div>
  )
}

// jshint esversion: 6
import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import Container from "./framework/container";
import LeftSideBar from "./leftSidebar";
import RightSideBar from "./rightSidebar";
import Legend from "./continuousLegend";
import Graph from "./graph/graph";
import MenuBar from "./menubar";
import Autosave from "./autosave";
import TermsOfServicePrompt from "./termsPrompt";
import {
  Position,
  Button,
  Popover,
  NumericInput,
  Icon,
  Tooltip,
  Drawer,
} from "@blueprintjs/core";
import actions from "../actions";

@connect((state) => ({
  loading: state.controls.loading,
  error: state.controls.error,
  graphRenderCounter: state.controls.graphRenderCounter,
}))
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;

    /* listen for url changes, fire one when we start the app up */
    window.addEventListener("popstate", this._onURLChanged);
    this._onURLChanged();

    dispatch(actions.doInitialDataLoad(window.location.search));

    /* listen for resize events */
    window.addEventListener("resize", () => {
      dispatch({
        type: "window resize",
        data: {
          height: window.innerHeight,
          width: window.innerWidth,
        },
      });
    });
    dispatch({
      type: "window resize",
      data: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    });
  }

  _onURLChanged() {
    const { dispatch } = this.props;

    dispatch({ type: "url changed", url: document.location.href });
  }

  render() {
    const { loading, error, graphRenderCounter } = this.props;
    return (
      <Container>
        <Helmet title="cellxgene" />
        {loading ? (
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            loading cellxgene
          </div>
        ) : null}
        {error ? (
          <div
            style={{
              position: "fixed",
              fontWeight: 500,
              top: window.innerHeight / 2,
              left: window.innerWidth / 2 - 50,
            }}
          >
            error loading
          </div>
        ) : null}
        <div>
          {loading ? null : <LeftSideBar />}
          {loading ? null : <RightSideBar />}
          {loading ? null : <MenuBar />}
          {loading ? null : <Graph key={graphRenderCounter} />}
          {loading ? null : <Autosave />}
          {loading ? null : <TermsOfServicePrompt />}
          <Drawer
            autoFocus="true"
            canEscapeKeyClose="true"
            canOutsideClickClose="true"
            enforceFocus="true"
            hasBackdrop="true"
            isOpen="false"
            position=" PositionRIGHT"
            size={"45em"}
            usePortal="true"
            title="Dataset Overview"
          >
            <div
              style={{
                padding: 20,
              }}
            >
              <h1 style={{ fontSize: 36 }}>
                A molecular cell atlas of the human lung from single cell RNA
                sequencing
              </h1>
              <h3 style={{ fontSize: 18 }}>Authors</h3>
              <p style={{ fontSize: 14 }}>
                Kyle J. Travaglini, Ahmad N. Nabhan, Lolita Penland, Rahul
                Sinha, Astrid Gilli,ch Rene V. Sit, Stephen Chang, Stephanie D.
                Conley, Yasuo Mori, Jun Seita, Gerald J. Berry, Joseph B.
                Shrager, Ross J. Metzger, Christin S. Kuo, Norma Neff, Irving L.
                Weissman, Stephen R. Quake, Mark A. Krasnow
              </p>
              <h3 style={{ fontSize: 18 }}>DOI</h3>
              <p style={{ fontSize: 14 }}>https://doi.org/10.1101/742320</p>
              <h3 style={{ fontSize: 18 }}>Comments</h3>
              <p style={{ fontSize: 14 }}>
                Tissue was collected from patients undergoing lobectomy for
                focal lung tumors, but normal tissue was obtained from
                uninvolved regions of the lung.
              </p>
              <h3 style={{ fontSize: 18 }}>Dataset Metadata</h3>
              <p style={{ fontSize: 14 }}>Organism: Homo Sapiens</p>
              <p style={{ fontSize: 14 }}>Disease: null</p>
            </div>
          </Drawer>
          <Legend />
        </div>
      </Container>
    );
  }
}

export default App;

/*
Kyle J. Travaglini,
Ahmad N. Nabhan,
Lolita Penland,
Rahul Sinha,
Astrid Gilli,ch
Rene V. Sit,
Stephen Chang,
Stephanie D. Conley,
Yasuo Mori,
Jun Seita,
Gerald J. Berry,
Joseph B. Shrager,
Ross J. Metzger,
Christin S. Kuo,
Norma Neff,
Irving L. Weissman,
Stephen R. Quake,
Mark A. Krasnow,


{'assay': "10X 3' v2 sequencing",
 'authors': array([
        "{'name': '
         "{'name': '}"
        
        "{'name': name': 
        "{'name': name': '}"
        
        "{'name': name': '}"
        
        "{'name': name': 
        "{'name': '}"
         "{'name': '}"
        
        "{'name': '}"
         "{'name': '}"
        
        "{'name': name': '}"
        
        "{'name': '
         'email': 'steve@czbiohub.org(opens in new tab)'}"
        
        "{'name': '
         'email': 'krasnow@stanford.edu(opens in new tab)'}"]
        
       dtype=object),
 'disease': '',
 'disease_comments': 'Tissue was collected from patients undergoing lobectomy for focal lung tumors, but normal tissue was obtained from uninvolved regions of the lung.',
 'organism': 'Homo sapiens',
 'preprint': {'date': '2019-08-27',
  'doi': 'https://doi.org/10.1101/742320',
  'title': 'A molecular cell atlas of the human lung from single cell RNA sequencing'},
 'short_name': 'krasnow_lab_human_lung_cell_atlas_10x',
 'tissue': array(['lung', 'blood'], dtype=object)}
 */

import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import * as firebase from 'firebase';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

class Downloader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: null
    };
    const id = this.props.fileName.replace(/[^a-zA-Z0-9]/g, '');
    firebase
      .database()
      .ref('annotations/' + id)
      .once('value', (snapshot) => {
        this.setState({
          data: snapshot.val(),
          dataLoaded: true
        });
      });
  }

  downloadResults() {
    const fileName = this.props.fileName;
    const rows = [["Filename", fileName], ["Label #", "X", "Y", "Label"]];
    this.state.data.forEach((d, i) => {
      rows.push([i, d.x, d.y, d.label]);
    });
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Labels');
    const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});
    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}),  fileName + '.labels.xlsx')
  }

  render() {
    return (
      <div>
        <h3>You have labelled all the points.</h3>
        {this.state.dataLoaded && 
          <div>
            <Button
              icon
              labelPosition='left'
              onClick={() => this.downloadResults()}>
              <Icon name='download' />
              Download Labels
            </Button>
            <Button
              basic
              icon
              labelPosition='left'
              onClick={() => this.props.restart()}>
              <Icon name='toggle left' />
              Restart
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default Downloader;
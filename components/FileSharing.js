import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import FileModel from '../models/File';
import FileManager from '../models/FileManager';

const shortid = require('shortid');

export default class FileSharing extends Component {
  state = {
    file: null,
    enableSharing: false
  }

  componentDidMount = async () => {
    const file = await FileModel.findById(this.props.id);
    this.setState({
      file
    })
  }

  enable = async () => {
    this.setState({ enableSharing: true });

    const { file } = this.state;
    const groupName = shortid.generate();
    const fileGroup = new FileManager({ name: groupName });
    await fileGroup.create();

    file.update({ userGroupId: fileGroup._id });
    await file.save();

    this.setState({ enableSharing: false });
  }

  render() {
    const { file } = this.state;
    if (file === null) {
      return null;
    } else if (file.attrs.userGroupId === undefined) {
      return (
        <Table striped fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>File Sharing</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>
                <Button
                  content='Enable'
                  basic
                  color='teal'
                  size='small'
                  onClick={this.enable}
                  loading={this.state.enableSharing}
                ></Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      )
    } else {
      return (
        <Table striped fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>File Sharing</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
      )
    }

  }
}
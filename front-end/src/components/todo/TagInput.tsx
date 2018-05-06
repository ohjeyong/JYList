import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore
import { WithContext as ReactTag } from 'react-tag-input';
import { TagInput as Props } from '../../containers/todo/TagInputContainer';
import 'react-tag-input/example/reactTags.css';

export class TagInput extends React.Component<Props> {
    requestFetchTagListByQuery = _.debounce(this.props.fetchTagListByQuery, 1000);

    handleInputChange = (value: string) => {
        const trimmedValue = _.trim(value);
        if (trimmedValue === '') {
            this.requestFetchTagListByQuery.cancel();
        } else {
            this.requestFetchTagListByQuery(trimmedValue);
        }
    }

    render() {
        return (
            <ReactTag
                tags={this.props.tags}
                handleInputChange={this.handleInputChange}
                suggestions={this.props.tagSearchResult}
                handleAddition={this.props.handleAddition}
                handleDelete={this.props.handleDelete}
            />
        );
    }
}

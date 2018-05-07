import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore
import { WithContext as ReactTag } from 'react-tag-input';
import { TagInput as Props, Tag } from '../../containers/todo/TagInputContainer';
import 'react-tag-input/example/reactTags.css';

export class TagInput extends React.Component<Props> {
    requestFetchTagListByQuery = _.debounce(this.props.fetchTagListByQuery, 1000);

    handleAddition = (tag: Tag) => {
        this.requestFetchTagListByQuery.cancel();
        this.props.handleAddition(tag);
    }

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
                handleAddition={this.handleAddition}
                handleDelete={this.props.handleDelete}
                minQueryLength={1}
                placeholder="태그를 입력해주세요."
                allowDeleteFromEmptyInput={false}
                autofocus={false}
            />
        );
    }
}

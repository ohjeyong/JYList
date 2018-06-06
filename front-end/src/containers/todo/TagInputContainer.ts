import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TagInput } from '../../components/todo/TagInput';
import { RootReducer, TodoState } from '../../reducers';
import { Tag as TagModel } from '../../models/todo';
import { thunksActionCreators, Actions } from '../../actions';

export interface Tag {
    id: string;
    text: string;
}

interface StateToProps extends Pick<TodoState, 'tagSearchLoading'> {
    tagSearchResult: Tag[];
}
type DispatchToProps = Pick<typeof thunksActionCreators, 'fetchTagListByQuery'>;

function changeTagModelListToTagList(tagList: TagModel[]) {
    return tagList.map((elem: TagModel) => ({
        id: elem.name,
        text: elem.name
    }));
}

interface OwnProps {
    tags: Tag[];
    handleAddition: (tag: Tag) => void;
    handleDelete: (id: number) => void;
}

export type TagInput = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    const tagSearchResult = changeTagModelListToTagList(state.todo.tagSearchResult);
    return {
        tagSearchLoading: state.todo.tagSearchLoading,
        tagSearchResult
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        fetchTagListByQuery: thunksActionCreators.fetchTagListByQuery
    };
    return bindActionCreators(map, dispatch);
};

export const TagInputContainer = connect<StateToProps, DispatchToProps, OwnProps>
(mapStateToProps, mapDispatchToProps)(TagInput);

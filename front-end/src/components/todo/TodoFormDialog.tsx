import * as _ from 'lodash';
import * as React from 'react';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { Category } from '../../models/todo';
import { TodoFormDialog as Props } from '../../containers/todo/TodoFormDialogContainer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import { CategorySelector } from './CategorySelector';
import { TagInputContainer, Tag } from '../../containers/todo/TagInputContainer';

// tslint:disable-next-line
function Transition(props: any) {
    return <Slide direction="up" {...props}/>;
}

export interface Error {
    category?: '카테고리를 선택해주세요.';
    content?: '내용을 입력해주세요.';
}

export class TodoFormDialog extends React.Component<Props> {
    onChangeContent = (value: string) => {
        this.props.changeTodoFormDialog('content', value);
    }

    onChangeCategory = (category: keyof Category | '') => {
        this.props.changeTodoFormDialog('category', category);
    }

    onTagAddition = (tag: Tag) => {
        this.props.changeTodoFormDialog('tagList', [...this.props.todoFormDialog.tagList, tag]);
    }

    onTagDelete = (idx: number) => {
        const newTags = [...this.props.todoFormDialog.tagList];
        _.pullAt(newTags, idx);
        this.props.changeTodoFormDialog('tagList', newTags);
    }

    handleClose = () => {
        this.props.setShowTodoForm(false);
    }

    handleSave = () => {
        this.props.changeTodoFormDialog('error', {});
        const { category, content, tagList } = this.props.todoFormDialog;
        const err: Error = {};
        if (category === '') {
            err.category = '카테고리를 선택해주세요.';
        }
        if (content === '') {
            err.content = '내용을 입력해주세요.';
        }
        if (_.isEmpty(err)) {
            const tag = tagList.map(elem => ({
                name: elem.text
            }));
            this.props.requestCreateTodo(category as keyof Category, content, tag);
        } else {
            this.props.changeTodoFormDialog('error', err);
        }
    }

    render() {
        const isFullScreen: boolean = window.innerHeight < 820;
        const { category, content, error, tagList } = this.props.todoFormDialog;
        return (
            <Dialog
                fullScreen={isFullScreen}
                open={this.props.showTodoForm}
                onClose={() => this.handleClose()}
                transition={Transition}
            >
                {
                    isFullScreen ?
                        <AppBar
                            style={{
                                position: 'relative'
                            }}
                        >
                            <Toolbar className="TodoFormToolbar">
                                <div>
                                    <IconButton
                                        color="inherit"
                                    >
                                        <CloseIcon
                                            onClick={() => this.handleClose()}
                                        />
                                    </IconButton>
                                    <Typography
                                        color="inherit"
                                        variant="title"
                                    >
                                        Todo 작성
                                    </Typography>
                                </div>
                                <Button
                                    color="inherit"
                                    onClick={() => this.handleSave()}
                                    disabled={this.props.todoFormLoading}
                                >
                                    {this.props.todoFormLoading ?
                                        <CircularProgress style={{color: 'white'}} size={20}/> : '추가하기'}
                                </Button>
                            </Toolbar>
                        </AppBar> :
                        <DialogTitle>Todo 작성</DialogTitle>
                }
                <DialogContent>
                    <div
                        style={{
                            padding: '10px 0'
                        }}
                    >
                        <FormControl
                            style={{
                                width: '130px'
                            }}
                            error={error.category !== undefined}
                        >
                            <Select
                                displayEmpty={true}
                                value={category}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    this.onChangeCategory(e.target.value as keyof Category | '');
                                }}
                            >
                                <MenuItem value="">
                                    <em style={{fontStyle: 'italic', color: 'rgba(0,0,0,0.3)'}}>카테고리</em>
                                </MenuItem>
                                <MenuItem value="FOOD">
                                    <CategorySelector category="FOOD" isActive={true} onClick={() => null}/>
                                </MenuItem>
                                <MenuItem value="PLACE">
                                    <CategorySelector category="PLACE" isActive={true} onClick={() => null}/>
                                </MenuItem>
                                <MenuItem value="TODO">
                                    <CategorySelector category="TODO" isActive={true} onClick={() => null}/>
                                </MenuItem>
                            </Select>
                            <FormHelperText>
                                {error.category}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            fullWidth={true}
                            error={error.content !== undefined}
                            style={{
                                minWidth: '270px'
                            }}
                        >
                            <TextField
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    this.onChangeContent(e.currentTarget.value);
                                }}
                                value={content}
                                multiline={true}
                                margin="normal"
                                placeholder="내용을 입력해주세요."
                            />
                            <FormHelperText>
                                {error.content}
                            </FormHelperText>
                        </FormControl>
                        <TagInputContainer
                            tags={tagList}
                            handleAddition={this.onTagAddition}
                            handleDelete={this.onTagDelete}
                        />
                        {
                            isFullScreen ?
                                null :
                                <div
                                    style={{
                                        marginTop: '10px',
                                        textAlign: 'right'
                                    }}
                                >
                                    <Button
                                        onClick={() => this.handleClose()}
                                        variant="raised"
                                        color="secondary"
                                        style={{
                                            marginRight: '5px'
                                        }}
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        variant="raised"
                                        color="primary"
                                        onClick={() => this.handleSave()}
                                        disabled={this.props.todoFormLoading}
                                    >
                                        {this.props.todoFormLoading ? <CircularProgress size={20}/> : '추가'}
                                    </Button>
                                </div>
                        }
                    </div>
                </DialogContent>

            </Dialog>
        );
    }
}

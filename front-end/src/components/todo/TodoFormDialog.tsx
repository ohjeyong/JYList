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
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import { CategorySelector } from './CategorySelector';

// tslint:disable-next-line
function Transition(props: any) {
    return <Slide direction="up" {...props}/>;
}

interface Error {
    category?: '카테고리를 선택해주세요.';
    content?: '내용을 입력해주세요.';
}

interface State {
    category: keyof Category | '';
    content: string;
    error: Error;
}

export class TodoFormDialog extends React.Component<Props, State> {
    readonly state: State = {
        category: '',
        content: '',
        error: {}
    };

    onChangeContent = (value: string) => {
        this.setState({
            content: value
        });
    }

    onChangeCategory = (category: keyof Category | '') => {
        this.setState({
            category
        });
    }

    handleClose = () => {
        this.props.setShowTodoForm(false);
    }

    handleSave = () => {
        this.setState({
            error: {}
        });
        const { category, content } = this.state;
        const error: Error = {};
        if (category === '') {
            error.category = '카테고리를 선택해주세요.';
        }
        if (content === '') {
            error.content = '내용을 입력해주세요.';
        }
        if (_.isEmpty(error)) {
            console.log(this.state);
        } else {
            this.setState({
                error
            });
        }
    }

    render() {
        const isFullScreen: boolean = window.innerHeight < 820;
        const { category, content, error } = this.state;
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
                                >
                                    추가하기
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
                    </div>
                </DialogContent>

            </Dialog>
        );
    }
}

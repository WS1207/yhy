const React = require('react');
const ReactDOM = require('react-dom');
const nav = require('./common.jsx');

import {
    Form,
    Switch,
    Layout,
    Menu,
    Icon,
    Breadcrumb,
    Row,
    Col,
    Upload,
    Dropdown,
    message,
    Card,
    Button,
    Input
} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="/login">退出</a>
        </Menu.Item>
    </Menu>
);
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

function onChange(checked) {

    fetch('/admin/paperCon/rec', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({checked})
    }).then((res) => res.json()).then((data) => {

    })
}
class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.content,
            url: this.props.data.url,
            title: this.props.data.title,
            id: this.props.data.id
        }
        this.content = this.content.bind(this);
        this.title = this.title.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(info) {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}));

        }
    }

    title(e) {
        var value = e.currentTarget.value;
        // console.log(value);
        this.setState({
            title: value
        });
        var sourceData = {
            id: this.state.id,
            value: value,
            index: 'title'
        };
        fetch('/admin/article_data', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(sourceData)
        }).then((res) => res.json()).then((data) => {
            // console.log(data);
        })

    }

    content(e) {
        var value = e.currentTarget.value;
        this.setState({
            content: value,
        })
        var sourceData = {
            id: this.state.id,
            value: value,
            index: 'content'
        }
        fetch('/admin/article_data', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(sourceData)
        }).then((res) => res.json()).then((data) => {
            // console.log(data);
        })
    }
    delete() {
        var sourceData = {
            id: this.props.data.id
        };
        fetch('/admin/article_del', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(sourceData)
        }).then((res) => res.json()).then((data) => {
            if(data == 'ok'){
                location.href='/admin/culture/essay'
            }
        })
    }

    render() {
        const data={id:this.state.id};
        const nnn = {
            name: 'file',
            action: '/admin/article_upload',
            headers: {
                authorization: 'authorization-text',
            },
            data:data,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    location.href=`/admin/culture/essay`
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }

            },
        };
        return (
            <div>
                <Card style={{width: 270, float: 'left', marginLeft: 10, marginTop: 10}} bodyStyle={{padding: 0}}>
                    <form action="" method="post">
                        <div className="custom-image">
                            <img src={`/images/${this.state.url}`} alt="图片加载失败！"
                                 style={{width: 100, height: 100,marginTop:20,marginLeft:85}}/>
                            <Upload {...nnn}>
                                <Button style={{marginLeft:85,marginTop:10}}>
                                    <Icon type="upload" /> 更改图片
                                </Button>
                            </Upload>
                        </div>
                        <div className="custom-card" >
                            <h3 className="name" style={{marginTop: 20}}>标题:</h3>
                            <Input type="text" placeholder="About the designer" onChange={this.title}
                                   value={this.state.title}/>
                            <h3 className="describe" style={{marginTop: 20}}>内容:</h3>
                            <Input type="textarea" placeholder="About the designer" onChange={this.content}
                                   value={this.state.content}/>
                        </div>
                        <Button className="aa delete ant-btn ant-btn-primary" type="button" onClick={() => {
                            this.delete()
                        }}>删除</Button>
                    </form>
                </Card>
            </div>

        )
    }
}
//剪纸文化：标题，内容，图片上传修改，设置推荐位
class Rows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.add = this.add.bind(this);
    }

    componentDidMount() {
        fetch('/admin/article_sele', {
            method: 'post',
            credentials: 'same-origin'
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            this.setState({
                data: data
            })

        })
    }

    add() {
        var sourceData = {
            title: '',
            content: '',
            url: '',
            rec: ''
        };
        fetch('/admin/article_add', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(sourceData)
        }).then((res) => res.json()).then((data) => {
            if(data == 'ok'){
                location.href='/admin/culture/essay'
            }
        })
    }
    render() {
        var sourceData = this.state.data;
        var rows = sourceData.map((v, i) => {
            return (
                <Cards data={v} key={i} id={v.id}/>
            )
        })
        return (
            <div>
                <div>
                    <Button className="bb editable-add-btn ant-btn ant-btn-primary" type="button" onClick={this.add}>添加</Button>
                </div>
                <Row>
                    {rows}
                </Row>
            </div>
        )
    }
}
//剪纸文化：标题，内容，图片上传修改，设置推荐位
ReactDOM.render(
    <nav.AppNav>
        <div className="des">
            <Rows/>
        </div>
    </nav.AppNav>
    , document.querySelector('#page'));
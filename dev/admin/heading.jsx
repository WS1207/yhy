const React = require('react');
const ReactDOM = require('react-dom');
const nav = require('./common.jsx');
import { Table, Input, Icon, Button, Popconfirm,Select } from 'antd';
const Option = Select.Option;
class EditableCell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            editable: false,
        }
        this.handleChange=this.handleChange.bind(this);
        this.check=this.check.bind(this);
        this.edit=this.edit.bind(this);
    }
    handleChange(e){
        const value = e.target.value;
        this.setState({ value });
    }
    check(){
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit(){
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [ {
            title: '图片',
            dataIndex: 'url',
            width:"32%"
        }, {
            title: '展示位置',
            dataIndex: 'position',
            width:"30%",
            render: (text, record, index) => (
                <Select labelInValue defaultValue={{ key: `${this.state.dataSource[index].position}` }} style={{ width: 100 }}
                        onFocus={()=>{this.changeState(this.state.dataSource[index].key)}}
                        onChange={this.handleChange}>
                    <Option value="0">晋韵文化</Option>
                    <Option value="1">剪纸艺术</Option>
                    <Option value="2">旅游产品</Option>
                </Select>
            )
        }, {
            title: 'operation',
            dataIndex: 'operation',
            width:"18%",
            render: (text, record, index) => {
                var id = this.state.dataSource[index].key;
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(id)}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                );
            },
        }];

        this.state = {
            dataSource: [{
                key: '',
                url: '',
                position: '0',
            }],
            updateId:0
        };
        this.handleChange=this.handleChange.bind(this);
        this.changeState=this.changeState.bind(this);
        this.onCellChange=this.onCellChange.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
    }
    componentDidMount() {
        fetch('/admin/getBanner', {
            credentials: 'same-origin'
        }).then((res)=>res.json()).then((data)=> {
            var arr = []
            data.forEach((v, i)=> {
                var obj = {key: v.id, url: v.url,position:v.position,bgColor:v.color};
                arr.push(obj);
            })
            this.setState({dataSource: arr});
        });
    }
    changeState(id){
        this.setState({
            updateId:id
        })
    }
    handleChange(value) {
        // console.log(value);  // { key: "lucy", label: "Lucy (101)" }
        value.id=this.state.updateId;
        fetch("/admin/chBannerPosition",{
            method:"post",
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(value)
        }).then((res)=>{res.json()}).then((data)=>{
            if(data==200){
                // console.log("ok");
            }
        })
    }
    onCellChange(index, key, id) {
        return (value) => {
            const that=this;
            var dataSource = [...this.state.dataSource];
            var id = dataSource[index].key;
            var data = {
                id: id,
                bgColor: value
            }
        };
    }
    onDelete(index){
        var id = {id: index};
        var arr = [...this.state.dataSource];
        const that=this;
        fetch('/admin/delBanner', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(id)
        }).then((res)=>
            res.json()
        ).then((data)=> {
            if(data==200){
                arr.forEach((v, i)=> {
                    if (v.key == index) {
                        arr.splice(i, 1);
                    }
                })
                that.setState({dataSource: arr});
            }
        })
    }
    handleAdd(){
        const { dataSource } = this.state;
        const that = this;
        fetch('/admin/addBanner', {
            credentials: 'same-origin'
        }).then((res)=>res.json()).then((data)=> {
            const newData = {
                key: data,
                url: '',
                position: '0',
                bgColor: '',
            };
            that.setState({
                dataSource: [...dataSource, newData]
            });
        });
    }
    render() {
        const { dataSource } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}
ReactDOM.render(
    <nav.AppNav>
        <div className="des">
            <EditableTable />
        </div>
    </nav.AppNav>
    , document.querySelector('#page'));
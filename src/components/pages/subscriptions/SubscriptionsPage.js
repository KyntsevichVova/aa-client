import React from 'react';
import { Button, Col, Pagination, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

function SubscriptionsPage() {
    const authorized = useSelector(selectors.status.selectAuthorized);
    const subscriptions = useSelector(selectors.subscriptions.selectSubscriptions);

    const dispatch = useDispatch();

    const onSetPage = React.useCallback((page) => {
        dispatch(actions.subscriptions.setPage({
            page: page - 1,
        }));
    }, [dispatch]);
    const onSetPageSize = React.useCallback((_, pageSize) => {
        dispatch(actions.subscriptions.setPageSize({
            pageSize,
        }));
    }, [dispatch]);

    const onUnsubscribe = React.useCallback((id) => {
        dispatch(actions.subscriptions.unsubscribe({
            id,
        }));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(actions.subscriptions.fetchAll());
    }, [dispatch, subscriptions.page, subscriptions.pageSize]);

    const columns = [
        {
            title: 'Author',
            dataIndex: 'author',
            sortOrder: false,
            fixed: true,
            width: '70%',
            render: (_, record) => {
                return (
                    <span>
                        <Link to={`/authors/${record.id}`}>{record.name}</Link>                   
                    </span>
                );
            },
        },
        {
            title: '',
            dataIndex: 'unsubscribe',
            sortOrder: false,
            fixed: true,
            width: '30%',
            render: (_, record) => {
                return (
                    <Button 
                        danger 
                        onClick={() => onUnsubscribe(record.id)}
                    >
                        Unsubscribe
                    </Button>
                );
            },
        },
    ];    
    
    return (
        <>
            {!authorized && (<Redirect to="/" />)}
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={subscriptions?.items?.map((item) => ({ ...item, key: item.id }))}
                        columns={columns}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination 
                        current={subscriptions.page + 1}
                        hideOnSinglePage={true}
                        pageSize={subscriptions.pageSize}
                        total={subscriptions.total}
                        onChange={onSetPage}
                        onShowSizeChange={onSetPageSize}
                    />
                </Col>
            </Row>
        </>
    );
}

export default SubscriptionsPage;
import React from 'react';
import { Col, Pagination, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

const columns = [
    {
        title: 'Article',
        dataIndex: 'article',
        sortOrder: false,
        fixed: true,
        width: '85%',
        render: (_, record) => {
            return (
                <span>
                    <Link to={`/articles/${record?.article?.id}`}>{record?.article?.title}</Link>                   
                </span>
            );
        },
    },
    {
        title: '',
        dataIndex: 'viewed',
        sortOrder: false,
        fixed: true,
        width: '15%',
        render: (_, record) => {
            const viewed = record.viewed;
            if (viewed) {
                return null;
            } else {
                return (
                    <span style={{
                        color: 'red',
                    }}>
                        New
                    </span>
                );
            }
        },
    },
];

function NotificationsPage() {
    const authorized = useSelector(selectors.status.selectAuthorized);

    const dispatch = useDispatch();
    const notifications = useSelector(selectors.notifications.selectNotifications);
    const onSetPage = React.useCallback((page) => {
        dispatch(actions.notifications.setPage({
            page: page - 1,
        }));
    }, [dispatch]);
    const onSetPageSize = React.useCallback((_, pageSize) => {
        dispatch(actions.notifications.setPageSize({
            pageSize,
        }));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(actions.notifications.fetchAll());
    }, [dispatch, notifications.page, notifications.pageSize]);
    
    return (
        <>
            {!authorized && (<Redirect to="/"/>)}
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={notifications?.items?.map((item) => ({ ...item, key: item.id }))}
                        columns={columns}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination 
                        current={notifications.page + 1}
                        hideOnSinglePage={true}
                        pageSize={notifications.pageSize}
                        total={notifications.total}
                        onChange={onSetPage}
                        onShowSizeChange={onSetPageSize}
                    />
                </Col>
            </Row>
        </>
    );
}

export default NotificationsPage;
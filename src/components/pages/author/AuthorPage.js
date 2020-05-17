import React from 'react';
import { Button, Col, Descriptions, Divider, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        sortOrder: false,
        fixed: true,
        width: '60%',
        render: (_, record) => {
            return (
                <span>
                    <Link to={`/articles/${record.id}`}>{record.title}</Link>                   
                </span>
            );
        },
    },
    {
        title: 'Authors',
        dataIndex: 'articleAuthors',
        sortOrder: false,
        fixed: true,
        width: '40%',
        render: (_, record) => {
            return record.articleAuthors.map((author) => (
                <span style={{
                    paddingRight: '5px',
                }}>
                    <Link to={`/authors/${author.id}`}>{author.name}</Link>
                    ;
                </span>
            ));
        },
    },
];

function AuthorPage() {
    const { authorId } = useParams();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.authors.fetchOne({
            id: authorId,
        }));
    }, [authorId, dispatch]);

    const author = useSelector(selectors.authors.selectOne);
    const authorized = useSelector(selectors.status.selectAuthorized);

    const onSubscribe = React.useCallback(() => {
        dispatch(actions.subscriptions.subscribe({
            id: authorId,
        }));
        dispatch(actions.authors.setOne({
            one: {
                ...author,
                subscribed: true,
            },
        }));
    }, [author, authorId, dispatch]);

    const onUnsubscribe = React.useCallback(() => {
        dispatch(actions.subscriptions.unsubscribe({
            id: authorId,
        }));
        dispatch(actions.authors.setOne({
            one: {
                ...author,
                subscribed: false,
            },
        }));
    }, [author, authorId, dispatch]);

    return (
        <>
            <Descriptions
                column={1}
                layout="horizontal"
            >
                <Descriptions.Item
                    label="Author"
                >
                    {author?.author?.name}
                </Descriptions.Item>
                {authorized && (
                    <Descriptions.Item
                        label="Subscription"
                    >
                        <Button 
                            type={author?.subscribed ? "default" : "primary"}
                            onClick={author?.subscribed ? onUnsubscribe : onSubscribe}
                        >
                            {author?.subscribed ? "Unsubscribe" : "Subscribe"}
                        </Button>
                    </Descriptions.Item>
                )}
            </Descriptions>
            <Divider>
                Articles
            </Divider>
            {author?.articles && (
                <Row>
                    <Col span={24}>
                        <Table
                            dataSource={author?.articles?.map((item) => ({ ...item, key: item.id }))}
                            columns={columns}
                        />
                    </Col>
                </Row>
            )}
        </>
    );}

export default AuthorPage;
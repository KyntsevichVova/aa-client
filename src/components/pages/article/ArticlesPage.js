import React from 'react';
import { Col, Pagination, Row, Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        sortOrder: false,
        fixed: true,
        width: '50%',
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
        width: '50%',
        render: (_, record) => {
            return record.articleAuthors.map((author) => (
                <>
                    <span style={{
                        paddingRight: '5px',
                    }}>
                        <Link to={`/authors/${author.id}`}>{author.name}</Link>
                        ;
                    </span>
                </>
            ));
        },
    },
];

function ArticlesPage() {
    const dispatch = useDispatch();
    const articles = useSelector(selectors.articles.selectArticles);
    const onSetPage = React.useCallback((page) => {
        dispatch(actions.articles.setPage({
            page: page - 1,
        }));
    }, [dispatch]);
    const onSetPageSize = React.useCallback((_, pageSize) => {
        dispatch(actions.articles.setPageSize({
            pageSize,
        }));
    }, [dispatch]);
    const onSetSearch = React.useCallback((search) => {
        dispatch(actions.articles.setSearch({
            search,
        }));
        dispatch(actions.articles.setPage({
            page: 0,
        }));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(actions.articles.fetchAll());
    }, [dispatch, articles.page, articles.pageSize, articles.search]);
    
    return (
        <>
            <Row>
                <Col span={6}>
                    <Input.Search 
                        allowClear={true}
                        placeholder={'Search'}
                        onSearch={onSetSearch}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={articles.items.map((item) => ({ ...item, key: item.id }))}
                        columns={columns}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination 
                        current={articles.page + 1}
                        hideOnSinglePage={true}
                        pageSize={articles.pageSize}
                        total={articles.total}
                        onChange={onSetPage}
                        onShowSizeChange={onSetPageSize}
                    />
                </Col>
            </Row>
        </>
    );
}

export default ArticlesPage;
import React from 'react';
import { Descriptions, Divider, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

function ArticlePage() {
    const { articleId } = useParams();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.articles.fetchOne({
            id: articleId,
        }));
    }, [articleId, dispatch]);

    const article = useSelector(selectors.articles.selectOne);

    return (
        <>
            <Descriptions
                column={1}
                layout="horizontal"
            >
                <Descriptions.Item
                    label="Title"
                >
                    {article?.title}
                </Descriptions.Item>
                {article?.link && (
                    <Descriptions.Item
                        label="Link"
                    >
                        {article?.link && (
                            <a href={article.link}>{article.link}</a>
                        )}   
                    </Descriptions.Item>)
                }
                {article?.citation && (
                    <Descriptions.Item
                        label="Citation"
                    >
                        {article.citation}   
                    </Descriptions.Item>)
                }
                <Descriptions.Item
                    label="Authors"
                >
                    {article?.articleAuthors?.map((author) => {
                        return (
                            <>
                                <span style={{
                                    paddingRight: '5px',
                                }}>
                                    <Link to={`/authors/${author.id}`}>{author.name}</Link>
                                    ;
                                </span>
                            </>
                        );
                    })}
                </Descriptions.Item>
                {article?.annotation && (
                    <Descriptions.Item
                        label="Abstract"
                    >
                        {article.annotation}   
                    </Descriptions.Item>)
                }
            </Descriptions>
            <Divider>
                Text
            </Divider>
            <Space align="center">
                {article?.articleText && (
                    <p>
                        {article.articleText.split('\n').map((v) => {
                            return (
                                <>
                                    {v}
                                    <br />
                                </>
                            )
                        })}
                    </p>
                )}
            </Space>
        </>
    );
}

export default ArticlePage;
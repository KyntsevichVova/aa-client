import React from 'react';
import { Row, Col, Table, Pagination } from 'antd';

function PaginatedTable({
    page, pageSize, total, items, columns,
    onPageChange, onPageSizeChange,
}) {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={items}
                        columns={columns}
                        pagination={false}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Pagination 
                        current={page + 1}
                        hideOnSinglePage={true}
                        pageSize={pageSize}
                        total={total}
                        onChange={onPageChange}
                        onShowSizeChange={onPageSizeChange}
                    />
                </Col>
            </Row>
        </>
    );
}

export default PaginatedTable;
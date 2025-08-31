import React from "react";
import { Pagination } from "react-bootstrap";

const Pagging = ({page, totalPage, onBtnPageClick}) => {
    return <Pagination style={{float: 'right', marginBottom: 0}}>
        {page > 1
            ? <>
                <Pagination.First onClick={() => { onBtnPageClick(1) }} />
                <Pagination.Prev onClick={() => { onBtnPageClick(page - 1) }} />
            </>
            : null}
        {page - 2 > 1
            ? <Pagination.Ellipsis />
            : null}
        {page - 2 > 0
            ? <Pagination.Item onClick={() => { onBtnPageClick(page - 2) }}>{page - 2}</Pagination.Item>
            : null}
        {page - 1 > 0
            ? <Pagination.Item onClick={() => { onBtnPageClick(page - 1) }}>{page - 1}</Pagination.Item>
            : null}
        <Pagination.Item active>{page}</Pagination.Item>
        {page + 1 < totalPage
            ? <Pagination.Item onClick={() => { onBtnPageClick(page + 1) }}>{page + 1}</Pagination.Item>
            : null}
        {page + 2 < totalPage
            ? <Pagination.Item onClick={() => { onBtnPageClick(page + 2) }}>{page + 2}</Pagination.Item>
            : null}
        {page + 2 < totalPage
            ? <Pagination.Ellipsis />
            : null}
        {page < totalPage
            ?
            <>
                <Pagination.Next onClick={() => { onBtnPageClick(page + 1) }} />
                <Pagination.Last onClick={() => { onBtnPageClick(totalPage) }} />
            </>
            : null}
    </Pagination>;
}

export default Pagging;
const { exec_sql } = require('../db/mysql.js');
const xss = require('xss')
const getList = async (author, keyword) => {
    //返回数据
    let sql = `SELECT * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec_sql(sql);
}
const getDetail = async (id) => {
    // console.log(id);
    const sql = `SELECT * from blogs where id='${id};'`
    const rows = await exec_sql(sql);
    return rows[0];
};

const newBlog = async (blogData = {}) => {
    //blogData 是一个博客对象，包含title, content, author属性
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author;
    const createtime = Date.now();

    const sql = `insert into blogs (title, content, createtime, author) 
    values ('${title}', '${content}',${createtime}, '${author}');`


    const insertData = await exec_sql(sql);
    return {
        id: insertData.insertId
    };
}
const updateBlog = async (id, blogData = {}) => {
    //blogData 是一个博客对象，包含title, content属性
    //id - 要更新博客的id
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const sql = `update blogs set title='${title}', content='${content}' where id=${id};`

    const updateData = await exec_sql(sql);
    // console.log(updateData);
    if (updateData.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}
const delBlog = async (id, author) => {
    //id - 要删除博客的id  
    const sql = `delete from blogs where id=${id} and author='${author}';`

    const delData = await exec_sql(sql);
    // console.log(delData);
    if (delData.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
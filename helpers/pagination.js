module.exports = (objectPagination,query, countRecord ) =>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }

    if(query.limit){
        objectPagination.litmitItems=parseInt(query.limit);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) *objectPagination.litmitItems;
    
    const totalPage = Math.ceil(countRecord/objectPagination.litmitItems);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}
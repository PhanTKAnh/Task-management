const Task = require("../../models/task.model");
const paginationHelper = require("../../../../helpers/pagination")
const searchHelper = require("../../../../helpers/search")

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        $or:[
            {createdBy: req.user.id},
            {listUser:req.user.id}
        ],
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    };

    // search
    const objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    //pagination
    const countTask = await Task.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            litmitItems: 2
        },
        req.query,
        countTask
    )
    //end pagination


    // sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    // End Sort

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.litmitItems)
        .skip(objectPagination.skip);

    res.json(tasks);
}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const tasks = await Task.findOne({
        _id: id,
        deleted: false
    }).select("title status timeStart timeFinish");



    res.json(tasks);
};

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
    
        await Task.updateOne(
            { _id: id }, // Điều kiện tìm kiếm
            { $set: { status: status } } // Thay đổi cần cập nhật
        );
        
        res.json({
            code: 200,
            message:"Cập nhật trạng thái thành công! "
        });
        
    } catch (error) {
        res.json({
            code: 400,
            message:"Không thành công! "
        });
    }
   
};
// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const {ids,key,value} = req.body;
        console.log(ids);
        console.log(key);
        console.log(value)

         switch (key) {
            case "status":
                await Task.updateMany({
                    _id: {$in: ids},
                },{
                    status:value
                });
                res.json({
                    code: 200,
                    message:"Cập nhật trạng thái thành công! "
                });
                break;
            case "deleted":
                await Task.updateMany({
                    _id: {$in: ids},
                },{
                    deleted: true,
                    deleteAt:new Date
                });
                res.json({
                    code: 200,
                    message:"Xóa thành công! "
                });
                break;
             
         
            default:
                res.json({
                    code: 400,
                    message:"Không tồn tại! "
                });
                break;
         }

        
        
    } catch (error) {
        res.json({
            code: 400,
            message:"Không tồn tại! "
        });
    }
   
   
};

// [PATCH] /api/v1/tasks/create
module.exports.createPost = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
       const task = new Task(req.body);
       const data = await task.save();
       res.json({
        code: 200,
        message:"tạo thành công! ",
        data
    });
    } catch (error) {
        res.json({
            code: 400,
            message:"Lỗi! "
        });
    }
   
   
};

// [PATCH] /api/v1/tasks/edit/:id
module.exports.editPatch= async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({_id:id}, req.body);


       res.json({
        code: 200,
        message:"Cập nhật thành công! ",
    });
    } catch (error) {
        res.json({
            code: 400,
            message:"Lỗi! "
        });
    }
   
   
};


// [PATCH] /api/v1/tasks/delete/:id
module.exports.delete= async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({_id:id},{
            deleted: true,
            deleteAt: new Date()
        });


       res.json({
        code: 200,
        message:"Xóa thành công! ",
    });
    } catch (error) {
        res.json({
            code: 400,
            message:"Lỗi! "
        });
    }
   
   
};
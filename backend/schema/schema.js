const graphql = require('graphql');

const Cbs = require('../models/cb');
const User = require('../models/user');
const Place = require('../models/places');
const Reports = require('../models/reports');
const Roles = require('../models/roles');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = graphql;

const CbType = new GraphQLObjectType({
    name: 'checklist',
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        isactive: {type: GraphQLString}
    })
});

const RolesType = new GraphQLObjectType({
    name: 'roles',
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString}
    })
});

const PlaceType = new GraphQLObjectType({
    name: 'place',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        role: {
            type: RolesType,
            resolve(parent, args) {
                return Roles.findById(parent.role_id);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args) {
                return Place.findById(parent.place_id);
            }
        }
    })
});

const ReportType = new GraphQLObjectType({
    name: 'report',
    fields: () => ({
        _id: {type: GraphQLID},
        date: {type: GraphQLString},
        cb_client_arr: {type: GraphQLString},
        cb_manager_arr: {type: GraphQLString},
        place: {
            type: PlaceType,
            resolve(parent, args) {
                return Place.findById(parent.place_id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cb: {
            type: CbType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Cbs.findById(args._id);
            }
        },
        cbs: {
            type: new GraphQLList(CbType),
            args: {},
            resolve(parent, args) {
                return Cbs.find({});
            }
        },
        user: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args._id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            args: {},
            resolve(parent, args) {
                return User.find({});
            }
        },
        role: {
            type: RolesType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Roles.findById(args._id);
            }
        },
        roles: {
            type: new GraphQLList(RolesType),
            args: {},
            resolve(parent, args) {
                return Roles.find({});
            }
        },
        place: {
            type: PlaceType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Place.findById(args._id);
            }
        },
        places: {
            type: new GraphQLList(PlaceType),
            args: {},
            resolve(parent, args) {
                return Place.find({});
            }
        },
        report: {
            type: ReportType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Reports.findById(args._id);
            }
        },
        reports: {
            type: new GraphQLList(ReportType),
            args: {},
            resolve(parent, args) {
                return Reports.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /*Checkboxes Mutations*/
        addCb: {
            type: CbType,
            args: {
                title: {type: GraphQLString},
                isactive: {type: GraphQLString}
            },
            resolve(parent, args) {
                const tempcb = new Cbs({
                    title: args.title,
                    isactive: args.isactive
                });
                tempcb.save();
                return tempcb;
            }
        },
        updateCb: {
            type: CbType,
            args: {
                _id: {type: GraphQLID},
                title: {type: GraphQLString},
                isactive: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Cbs.findByIdAndUpdate(
                    args._id,
                    {$set: {title: args.title, isactive: args.isactive}},
                    {new: true}
                );
            }
        },
        deleteCb: {
            type: CbType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Cbs.findByIdAndRemove(args._id);
            }
        },
        /*User Mutations*/
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                role: {type: GraphQLID},
                place: {type: GraphQLID}
            },
            resolve(parents, args) {
                const tempuser = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    role_id: args.role,
                    place_id: args.place
                });
                tempuser.save();
                return tempuser;
            }
        },
        updateUser: {
            type: UserType,
            args: {
                _id: {type: GraphQLID},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                role: {type: GraphQLID},
                place: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Cbs.findByIdAndUpdate(
                    args._id,
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            password: args.password,
                            role: args.role,
                            place: args.place
                        }
                    },
                    {new: true}
                );
            }
        },
        deleteUser: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findByIdAndRemove(args._id);
            }
        },
        /*Place Mutations*/
        addPlace: {
            type: PlaceType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parents, args) {
                const tempplace = new Place({
                    name: args.name
                });
                tempplace.save();
                return tempplace;
            }
        },
        updatePlace: {
            type: PlaceType,
            args: {
                _id: {type: GraphQLID},
                name: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Place.findByIdAndUpdate(
                    args._id,
                    {
                        $set: {
                            name: args.name
                        }
                    },
                    {new: true}
                );
            }
        },
        deletePlace: {
            type: PlaceType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Place.findByIdAndRemove(args._id);
            }
        },
        /*Report Mutations*/
        addReport: {
            type: ReportType,
            args: {
                place_id: {type: GraphQLID},
                date: {type: GraphQLString},
                cb_client_arr: {type: GraphQLString},
                cb_manager_arr: {type: GraphQLString}
            },
            resolve(parents, args) {
                const tempreport = new Reports({
                    place_id: args.place_id,
                    date: args.date,
                    cb_client_arr: args.cb_client_arr,
                    cb_manager_arr: args.cb_manager_arr
                });
                tempreport.save();
                return tempreport;
            }
        },
        updateReport: {
            type: ReportType,
            args: {
                _id: {type: GraphQLID},
                place_id: {type: GraphQLID},
                date: {type: GraphQLString},
                cb_client_arr: {type: GraphQLString},
                cb_manager_arr: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Reports.findByIdAndUpdate(
                    args._id,
                    {
                        $set: {
                            place_id: args.place_id,
                            date: args.date,
                            cb_client_arr: args.cb_client_arr,
                            cb_manager_arr: args.cb_manager_arr
                        }
                    },
                    {new: true}
                );
            }
        },
        deleteReport: {
            type: ReportType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Reports.findByIdAndRemove(args._id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
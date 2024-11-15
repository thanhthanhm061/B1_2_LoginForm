import User from "../models/user.mjs";

class UserController {
  static async index(req, res) {
    let q = req.query.q;
    q = `.*${q}.*`;
    var re = new RegExp(q);
    let users = await User.find({});  // Optionally, you can add the regex to search users
    res.render("user", { title: "User Management", users });
  }

  static async new(req, res) {
    res.render("formnew", { title: "User Management" });
  }

  static async delete(req, res) {
    let userdelete = await User.deleteOne({ _id: req.params.id });
    res.redirect("/users");
  }

  static async create(req, res) {
    let { email, name, role } = req.body;
    let user = await User.create({ email, name, role });
    if (user) {
      res.redirect("/users");
    } else {
      res.render("formnew", { title: "User Management" });
    }
  }

  // Edit user: Render the user data in the form
  static async edit(req, res) {
    let user = await User.findById(req.params.id);
    if (user) {
      res.render("formedit", { title: "Edit User", user });
    } else {
      res.redirect("/users");
    }
  }

  // Update user: Save the changes made in the form
  static async update(req, res) {
    let { email, name, role } = req.body;
    try {
      // Update the user by their ID and return the updated document
      let user = await User.findByIdAndUpdate(
        req.params.id, 
        { email, name, role },
        { new: true, runValidators: true }  // Ensure the updated user is returned and validations are run
      );
      
      if (user) {
        res.redirect("/users");  // Redirect to the user list page after successful update
      } else {
        res.redirect("/users");  // If the update fails, still redirect to the list
      }
    } catch (error) {
      console.log("Error updating user:", error);  // Log the error
      res.redirect("/users");  // Redirect to user list if error occurs
    }
  }
}

export default UserController;

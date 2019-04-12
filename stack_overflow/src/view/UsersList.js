import React from "react";

const UsersList = ({ users, title, id, username, password, email, score, isAdmin, isBanned, onCreate, onChange }) => (
    <div>
        <h2> {title || "Users"} </h2>
        <div>
            <label> Id: </label>
            <input value={id}
                onChange={e => onChange("id", e.target.value)} />
            <br />

            <label> Username: </label>
            <input value={username}
                onChange={e => onChange("username", e.target.value)} />
            <br />

            <label> Password: </label>
            <input value={password}
                onChange={e => onChange("password", e.target.value)} />
            <br />

            <label> Email: </label>
            <input value={email}
                onChange={e => onChange("email", e.target.value)} />
            <br />

            <label> Score: </label>
            <input value={score}
                onChange={e => onChange("score", e.target.value)} />
            <br />

            <label> Is Admin: </label>
            <input value={isAdmin}
                onChange={e => onChange("isAdmin", e.target.value)} />
            <br />

            <label> Is Banned: </label>
            <input value={isBanned}
                onChange={e => onChange("isBanned", e.target.value)} />
            <br />
            <button onClick={onCreate}> Create!</button>
        </div>

        <hr />
            <table border="1">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Username </th>
                        <th> Password </th>
                        <th> Email </th>
                        <th> Score </th>
                        <th> Is Admin </th>
                        <th> Is Banned </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td> {user.id} </td>
                                <td> {user.username} </td>
                                <td> {user.password} </td>
                                <td> {user.email} </td>
                                <td> {user.score} </td>
                                <td> {user.isAdmin} </td>
                                <td> {user.isBanned} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
);

export default UsersList;
// src/pages/Profile.jsx
import {useState} from "react";
import {useGetProfileQuery, useUpdateProfileMutation} from "../features/user/userApi";

export default function Profile() {
  const {data: profile, isLoading, isError} = useGetProfileQuery();
  const [updateProfile, {isLoading: saving}] = useUpdateProfileMutation();

  // Édition du nom (toggle)
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (isLoading)
    return (
      <main className="main profile">
        <p>Loading…</p>
      </main>
    );
  if (isError || !profile)
    return (
      <main className="main profile">
        <p role="alert">Unable to load profile.</p>
      </main>
    );

  const startEdit = () => {
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFirstName("");
    setLastName("");
  };

  const saveEdit = async () => {
    await updateProfile({firstName, lastName}).unwrap();
    setIsEditing(false);
  };

  return (
    <main className="main profile">
      <div className="profile-header">
        <h1 className="profile-title">Welcome back</h1>
        {!isEditing ?
          <button className="btn btn-primary" onClick={startEdit}>
            Edit Name
          </button>
        : <div className="profile-edit" aria-live="polite">
            <input
              id="edit-firstname"
              className="profile-input"
              type="text"
              placeholder="First name"
              value={firstName || profile.firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              id="edit-lastname"
              className="profile-input"
              type="text"
              placeholder="Last name"
              value={lastName || profile.lastName || ""}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <div className="profile-actions">
              <button className="btn btn-outline" onClick={saveEdit} disabled={saving || (!firstName && !lastName)}>
                Save
              </button>
              <button className="btn btn-outline" onClick={cancelEdit} type="button">
                Cancel
              </button>
            </div>
          </div>
        }
      </div>

      {/* Conserve les sections "Accounts" de la maquette (statiques en Phase 1) */}
      <h2 className="sr-only">Accounts</h2>

      <section className="account card">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button transaction-button--primary">View transactions</button>
        </div>
      </section>

      <section className="account card">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button transaction-button--primary">View transactions</button>
        </div>
      </section>

      <section className="account card">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button transaction-button--primary">View transactions</button>
        </div>
      </section>
    </main>
  );
}

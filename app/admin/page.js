'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'PROSPECT_INVESTOR',
    company: '',
    investmentRound: '',
    accessLevel: 'TIER_1',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    fetchUsers();
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Created user: ${newUser.email}`);
        setNewUser({
          email: '',
          name: '',
          role: 'PROSPECT_INVESTOR',
          company: '',
          investmentRound: '',
          accessLevel: 'TIER_1',
          notes: ''
        });
        fetchUsers();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setMessage('✅ User deleted');
        fetchUsers();
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      PROSPECT_INVESTOR: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      CURRENT_INVESTOR: 'bg-green-500/20 text-green-300 border-green-500/30',
      BOARD_MEMBER: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      PARTNER: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      ADMIN: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    return colors[role] || colors.PROSPECT_INVESTOR;
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage investor accounts and permissions</p>
        </div>

        {/* Create New User Form */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Investor Account</h2>
          
          {message && (
            <div className="mb-4 p-3 bg-gray-800 border border-gray-700 rounded text-sm">
              {message}
            </div>
          )}

          <form onSubmit={createUser} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
                placeholder="investor@fund.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
              >
                <option value="PROSPECT_INVESTOR">Prospect Investor</option>
                <option value="CURRENT_INVESTOR">Current Investor</option>
                <option value="BOARD_MEMBER">Board Member</option>
                <option value="PARTNER">Partner</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={newUser.company}
                onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
                placeholder="Acme Ventures"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Investment Round</label>
              <select
                value={newUser.investmentRound}
                onChange={(e) => setNewUser({...newUser, investmentRound: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
              >
                <option value="">Select Round</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
                <option value="Growth">Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Access Level</label>
              <select
                value={newUser.accessLevel}
                onChange={(e) => setNewUser({...newUser, accessLevel: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
              >
                <option value="TIER_1">Tier 1 - Basic</option>
                <option value="TIER_2">Tier 2 - Standard</option>
                <option value="TIER_3">Tier 3 - Premium</option>
                <option value="TIER_4">Tier 4 - VIP</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Internal Notes</label>
              <textarea
                value={newUser.notes}
                onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
                rows="2"
                placeholder="Internal notes about this investor..."
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded font-medium"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Existing Users ({users.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Round</th>
                  <th className="text-left py-2">Access</th>
                  <th className="text-left py-2">Created</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800">
                    <td className="py-3">{user.name || 'N/A'}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs border ${getRoleBadge(user.role)}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3">{user.company || 'N/A'}</td>
                    <td className="py-3">{user.investmentRound || 'N/A'}</td>
                    <td className="py-3">{user.accessLevel}</td>
                    <td className="py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
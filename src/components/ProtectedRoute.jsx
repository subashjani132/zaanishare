import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login'); // Redirects to login if not signed in
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  
  return user ? children : null;
};

export default ProtectedRoute;
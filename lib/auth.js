import { supabase } from "./supabase";

// SIGNUP
export const signUp = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://www.resumeverse3d.me/builder",
    },
  });

  if (data?.user) {
    await supabase.from("users").insert([
      {
        id: data.user.id,
        email: data.user.email,
        name: name,
      },
    ]);
  }

  return { data, error };
};

// LOGIN
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.user) {
    // 🔥 CHECK if user exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("id", data.user.id)
      .single();

    // 🔥 IF NOT → INSERT
    if (!existing) {
      await supabase.from("users").insert([
        {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || "User",
        },
      ]);
    }
  }

  return { data, error };
};

// LOGOUT
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
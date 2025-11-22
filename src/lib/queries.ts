import { supabase } from './supabase';

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats() {
    try {
        // Get total counts
        const [studentsRes, teachersRes, classesRes, announcementsRes] = await Promise.all([
            supabase.from('students').select('id', { count: 'exact', head: true }),
            supabase.from('teachers').select('id', { count: 'exact', head: true }),
            supabase.from('classes').select('id', { count: 'exact', head: true }),
            supabase.from('announcements').select('id', { count: 'exact', head: true }),
        ]);

        return {
            totalStudents: studentsRes.count || 0,
            totalTeachers: teachersRes.count || 0,
            totalClasses: classesRes.count || 0,
            totalAnnouncements: announcementsRes.count || 0,
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return { totalStudents: 0, totalTeachers: 0, totalClasses: 0, totalAnnouncements: 0 };
    }
}

/**
 * Get recent attendance data for charts
 */
export async function getAttendanceTrend(months = 5) {
    try {
        const { data, error } = await supabase
            .from('attendance')
            .select('date, status')
            .gte('date', new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000).toISOString())
            .order('date');

        if (error) throw error;

        // Group by month and calculate percentage
        const monthlyData: Record<string, { total: number; present: number }> = {};

        (data || []).forEach((record: any) => {
            const month = new Date(record.date).toLocaleDateString('id-ID', { month: 'short' });
            if (!monthlyData[month]) {
                monthlyData[month] = { total: 0, present: 0 };
            }
            monthlyData[month].total++;
            if (record.status === 'Hadir') {
                monthlyData[month].present++;
            }
        });

        return Object.entries(monthlyData).map(([month, data]) => ({
            month,
            percentage: Math.round((data.present / data.total) * 100),
        }));
    } catch (error) {
        console.error('Error fetching attendance trend:', error);
        return [];
    }
}

/**
 * Get students list with filters
 */
export async function getStudents(filters?: { classId?: string; search?: string }) {
    try {
        let query = supabase
            .from('students')
            .select(`
        id,
        nis,
        nisn,
        gender,
        date_of_birth,
        address,
        class_id,
        users!inner (
          id,
          full_name,
          phone
        ),
        classes (
          id,
          name
        )
      `)
            .order('created_at', { ascending: false });

        if (filters?.classId) {
            query = query.eq('class_id', filters.classId);
        }

        if (filters?.search) {
            query = query.or(`nis.ilike.%${filters.search}%,users.full_name.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data || [];
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

/**
 * Get teachers list
 */
export async function getTeachers() {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select(`
        id,
        nip,
        subject_specialization,
        users!inner (
          id,
          full_name,
          email,
          phone
        )
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
}

/**
 * Get classes list
 */
export async function getClasses() {
    try {
        const { data, error } = await supabase
            .from('classes')
            .select(`
        id,
        name,
        grade_level,
        academic_year,
        teachers (
          id,
          users (
            full_name
          )
        )
      `)
            .order('name');

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching classes:', error);
        return [];
    }
}

/**
 * Get announcements
 */
export async function getAnnouncements(limit?: number) {
    try {
        let query = supabase
            .from('announcements')
            .select(`
        id,
        title,
        content,
        priority,
        target_audience,
        published_at,
        users (
          full_name
        )
      `)
            .order('published_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
}

/**
 * Get assignments for a teacher
 */
export async function getTeacherAssignments(teacherId: string) {
    try {
        const { data, error } = await supabase
            .from('assignments')
            .select(`
        id,
        title,
        description,
        deadline,
        max_score,
        status,
        classes (name),
        subjects (name)
      `)
            .eq('teacher_id', teacherId)
            .order('deadline', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return [];
    }
}

/**
 * Get student grades
 */
export async function getStudentGrades(studentId: string) {
    try {
        const { data, error } = await supabase
            .from('grades')
            .select(`
        id,
        semester,
        academic_year,
        midterm_score,
        final_score,
        assignment_score,
        total_score,
        grade,
        subjects (
          name,
          code,
          kkm
        )
      `)
            .eq('student_id', studentId)
            .order('semester');

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching grades:', error);
        return [];
    }
}

/**
 * Get SPP payments for student
 */
export async function getStudentPayments(studentId: string) {
    try {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('student_id', studentId)
            .order('year', { ascending: false })
            .order('month', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
}

/**
 * Get messages for a user
 */
export async function getUserMessages(userId: string) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select(`
        id,
        subject,
        message,
        status,
        created_at,
        from_user:users!from_user_id (
          full_name,
          role
        ),
        to_user:users!to_user_id (
          full_name,
          role
        )
      `)
            .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

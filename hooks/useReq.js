import useQuery from '@/hooks/useQuery'

export default function useReq() {
    const query = useQuery();

    const startEdit = () => {
        query.toggle('mode', 'edit');
        query.remove('req')
    }
    
    const selectReq = (id) => {
        query.toggle('req', id)
    }

    const isSelected = (id) => {
        return query.get('req') === id.toString();
    }

    const endEdit = () => {
        query.remove('mode');
    }

    const editMode = query.is('mode', 'edit');

    const isFocused = (id) => {
        return query.get('focus') === id.toString();
    }

    const focus = (id) => {
        query.toggle('focus', id)
    }

    const blur = () => {
        query.remove('focus');
    }
    

    return {
        editMode,
        startEdit,
        endEdit,
        isFocused,
        selectReq,
        isSelected,
        focus,
        blur
    }
}



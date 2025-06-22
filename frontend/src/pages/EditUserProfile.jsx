import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Chip,
    Grid,
    IconButton,
    FormControl,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Modal,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileContext } from '../context/ProfileContext';
import Avataaars from 'awesome-react-avataaars';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { profile, setProfile, isLoading } = useContext(ProfileContext);

    const [avatarConfig, setAvatarConfig] = useState(null);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [role, setRole] = useState('Ученик');
    const [skills, setSkills] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (profile) {
            setAvatarConfig(profile.avatar || {
                topType: 'ShortHairShortFlat',
                hairColor: 'Brown',
                skinColor: 'Light',
                eyeType: 'Default',
                clotheType: 'ShirtCrewNeck',
                clotheColor: '#FFFFFF',
                mouthType: 'Smile',
                accessoriesType: 'Blank',
                facialHairType: 'Blank',
                avatarBackground: '#FFFFFF',
            });
            setName(profile.name || 'Пользователь');
            setBirthDate(profile.birth_date || '');
            setRole(profile.role || 'Ученик');
            setSkills(profile.skills || []);
        }
    }, [profile]);

    const availableSkills = [
        'HTML',
        'CSS',
        'Python',
        'C++',
        'Golang',
        'Мат.грамотность',
        'Грамотность чтения',
        'Информатика',
    ];

    const hairTypes = [
        { value: 'ShortHairShortFlat', label: <div>Короткие<br />прямые</div> },
        { value: 'LongHairStraight', label: <div>Длинные<br />прямые</div> },
        { value: 'ShortHairDreads01', label: <div>Короткие<br />дреды</div> },
        { value: 'LongHairCurly', label: <div>Длинные<br />кудрявые</div> },
        { value: 'ShortHairFrizzle', label: <div>Короткие<br />кудряшки</div> },
        { value: 'LongHairBigHair', label: <div>Объемные<br />длинные</div> },
        { value: 'ShortHairTheCaesar', label: <div>Цезарь</div> },
        { value: 'LongHairMiaWallace', label: <div>Челка<br />набок</div> },
        { value: 'WinterHat1', label: <div>Зимняя<br />шапка</div> },
        { value: 'NoHair', label: <div>Без<br />волос</div> },
    ];
    const hairColors = [
        { value: 'Brown', label: 'Коричневый' },
        { value: 'Black', label: 'Черный' },
        { value: 'Blonde', label: 'Блонд' },
        { value: 'Auburn', label: 'Рыжий' },
        { value: 'DarkBrown', label: <div>Темно-<br />коричневый</div> },
        { value: 'PastelPink', label: <div>Пастельно-<br />розовый</div> },
        { value: 'Blue', label: 'Синий' },
        { value: 'Red', label: 'Красный' },
        { value: 'SilverGray', label: <div>Серебристо-<br />серый</div> },
        { value: 'Platinum', label: 'Платиновый' },
    ];
    const skinColors = [
        { value: 'Light', label: 'Светлый' },
        { value: 'Pale', label: 'Бледный' },
        { value: 'Brown', label: 'Коричневый' },
        { value: 'DarkBrown', label: <div>Темно-<br />коричневый</div> },
        { value: 'Yellow', label: 'Желтый' },
        { value: 'Black', label: 'Черный' },
    ];
    const eyeTypes = [
        { value: 'Default', label: 'Обычные' },
        { value: 'Happy', label: 'Веселые' },
        { value: 'Wink', label: 'Подмигивающие' },
        { value: 'Surprised', label: 'Удивленные' },
        { value: 'Side', label: <div>Взгляд<br />в сторону</div> },
        { value: 'Close', label: 'Закрытые' },
        { value: 'Dizzy', label: 'Головокружение' },
        { value: 'EyeRoll', label: <div>Закатывание<br />глаз</div> },
        { value: 'Hearts', label: 'Сердечки' },
        { value: 'Cry', label: 'Плачущие' },
    ];
    const mouthTypes = [
        { value: 'Smile', label: 'Улыбка' },
        { value: 'Default', label: 'Обычный' },
        { value: 'Serious', label: 'Серьезный' },
        { value: 'Twinkle', label: 'Сияющий' },
        { value: 'Tongue', label: <div>Высунутый<br />язык</div> },
        { value: 'Sad', label: 'Грустный' },
        { value: 'Eating', label: 'Еда' },
        { value: 'Grimace', label: 'Гримаса' },
        { value: 'Disbelief', label: 'Недоверие' },
    ];
    const clotheTypes = [
        { value: 'ShirtCrewNeck', label: 'Футболка' },
        { value: 'Hoodie', label: 'Худи' },
        { value: 'BlazerShirt', label: 'Пиджак' },
        { value: 'ShirtVNeck', label: (<div>Футболка<br />V-образная</div>) },
        { value: 'Overall', label: 'Комбинезон' },
        { value: 'CollarSweater', label: 'Свитер' },
        { value: 'ShirtScoopNeck', label: <div>Футболка c<br />круглым вырезом</div> },
        { value: 'BlazerSweater', label: <div>Пиджак<br />со свитером</div> },
    ];
    const accessoriesTypes = [
        { value: 'Blank', label: <div>Без<br />аксессуаров</div> },
        { value: 'Round', label: 'Круглые очки' },
        { value: 'Sunglasses', label: <div>Солнцезащитные<br />очки</div> },
        { value: 'Wayfarers', label: 'Очки вайфарер' },
        { value: 'Prescription01', label: <div>Очки<br />классические</div> },
        { value: 'Prescription02', label: <div>Очки<br />квадратные</div> },
        { value: 'Kurt', label: 'Очки ретро' },
    ];
    const facialHairTypes = [
        { value: 'Blank', label: 'Без бороды' },
        { value: 'BeardMedium', label: 'Средняя борода' },
        { value: 'BeardLight', label: 'Легкая борода' },
        { value: 'BeardMajestic', label: 'Пышная борода' },
        { value: 'MoustacheFancy', label: 'Изысканные усы' },
        { value: 'MoustacheMagnum', label: 'Усы магнум' },
    ];
    const backgroundColors = [
        { value: '#FFFFFF', label: 'Белый' },
        { value: '#F2E8D5', label: 'Бежевый' },
        { value: '#C4C2E0', label: 'Фиолетовый' },
        { value: '#D7ED93', label: 'Зеленый' },
        { value: '#E3F0A0', label: 'Светло-зеленый' },
        { value: '#FFCCCC', label: 'Розовый' },
        { value: '#CCE5FF', label: 'Голубой' },
        { value: '#FFD700', label: 'Золотой' },
        { value: '#FF6347', label: 'Томатный' },
        { value: '#BA55D3', label: 'Пурпурный' },
        { value: '#20B2AA', label: 'Бирюзовый' },
        { value: '#FFA500', label: 'Оранжевый' },
        { value: '#6A5ACD', label: 'Сланцевый' },
        { value: '#F0E68C', label: 'Хаки' },
        { value: '#A9A9A9', label: 'Серый' },
    ];

    const handleAvatarChange = (key, value) => {
        setAvatarConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleSkillChange = (skill) => {
        setSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const handleSave = async () => {
        const updatedProfile = {
            name,
            birth_date: birthDate || null,
            role,
            skills,
            avatar: avatarConfig,
        };
        const success = await setProfile(updatedProfile);
        if (success) {
            navigate('/profile');
        } else {
            alert('Ошибка при сохранении профиля');
        }
    };

    const handleBackClick = () => {
        navigate('/profile');
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const calculateAge = () => {
        if (!birthDate) return '';
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            return `${age - 1} лет`;
        }
        return `${age} лет`;
    };

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (!profile) {
        return <Typography>Профиль не найден. Пожалуйста, войдите в систему.</Typography>;
    }

    return (
    <Box
        sx={{
            bgcolor: '#F2E8D5',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column', // Добавляем для вертикального расположения
            alignItems: 'center',    // Центрируем содержимое по горизонтали
            p: 2,
            position: 'relative',
        }}
    >
        {/* Заголовок сверху по центру */}
        <Box sx={{ textAlign: 'center', py: 2, mb: 2, width: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur, sans-serif' }}>
                Редактировать профиль
            </Typography>
        </Box>

        <IconButton
            className="back-button"
            onClick={handleBackClick}
            aria-label="назад"
            sx={{
                position: 'absolute',
                top: 40, 
                left: 50,
                zIndex: 20,
            }}
        >
            <ArrowBackIcon />
        </IconButton>
            <Box
                sx={{
                    width: 900,
                    border: '3px solid #374D45',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#FCF8EE',
                }}
            >
                <Box sx={{ bgcolor: '#C4C2E0', height: 100, borderBottom: '3px solid #374D45' }}></Box>
                <Box
                    sx={{
                        width: { xs: 70, sm: 100 },
                        height: { xs: 70, sm: 100 },
                        border: '3px solid #374D45',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: 50,
                        left: '15%', // Смещаем левее до 5%
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: avatarConfig?.avatarBackground,
                    }}
                >
                    <Avataaars
                        style={{ width: '100%', height: '100%' }}
                        topType={avatarConfig?.topType}
                        hairColor={avatarConfig?.hairColor}
                        skinColor={avatarConfig?.skinColor}
                        eyeType={avatarConfig?.eyeType}
                        clotheType={avatarConfig?.clotheType}
                        clotheColor={avatarConfig?.clotheColor}
                        mouthType={avatarConfig?.mouthType}
                        accessoriesType={avatarConfig?.accessoriesType}
                        facialHairType={avatarConfig?.facialHairType}
                    />
                </Box>
                <Box sx={{ p: 3, pt: 7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            mb: 2,
                            borderColor: '#374D45',
                            color: '#374D45',
                            textTransform: 'none',
                            left: '-37%',
                            top: '10px',
                            fontFamily: 'Tektur'
                        }}
                        onClick={handleOpenModal}
                    >
                        Настроить аватарку
                    </Button>
                    <Grid container justifyContent="space-between" alignItems="flex-start" sx={{ mt: 2 }}>
                        <Box>
                            <TextField
                                label="Имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ mb: 2, fontFamily: 'Tektur' }}
                            />
                            <TextField
                                label="Дата рождения"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                sx={{ left: '10px', fontFamily: 'Tektur'}}
                            />
                            <Typography variant="body2" sx={{ color: '#374D45', mt: 1, fontFamily: 'Tektur' }}>
                                Возраст: {calculateAge()}
                            </Typography>
                        </Box>
                        <FormControl>
                        <InputLabel id="role-label">Роль</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role-select"
                                value={role}
                                label="Роль"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="Ученик">Ученик</MenuItem>
                                <MenuItem value="Учитель">Учитель</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#374D45', fontFamily: 'Tektur' }}>
                            Навыки:
                        </Typography>
                        <FormGroup
                            sx={{ mt: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                        >
                            {availableSkills.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    control={
                                        <Checkbox
                                            checked={skills.includes(skill)}
                                            onChange={() => handleSkillChange(skill)}
                                        />
                                    }
                                    label={skill}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#374D45',
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            mt: 3,
                            fontFamily: 'Tektur'
                        }}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '16px',
                        p: 4,
                        maxWidth: 1000,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: 24,
                    }}
                >
                    <Typography id="modal-title" variant="h6" sx={{ mb: 2, color: '#374D45', fontFamily: 'Tektur' }}>
                        Настройка аватарки
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Тип волос
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {hairTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.topType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('topType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={type.value}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Цвет волос
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {hairColors.map((color) => (
                                <Box
                                    key={color.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.hairColor === color.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('hairColor', color.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={color.value}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {color.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur'}}>
                            Цвет кожи
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {skinColors.map((color) => (
                                <Box
                                    key={color.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.skinColor === color.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('skinColor', color.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={color.value}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {color.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Глаза
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {eyeTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.eyeType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('eyeType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={type.value}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Рот
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {mouthTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.mouthType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('mouthType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={type.value}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Одежда
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {clotheTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.clotheType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('clotheType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={type.value}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Аксессуары
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {accessoriesTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.accessoriesType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('accessoriesType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={type.value}
                                        facialHairType={avatarConfig?.facialHairType}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Борода
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {facialHairTypes.map((type) => (
                                <Box
                                    key={type.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.facialHairType === type.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('facialHairType', type.value)}
                                >
                                    <Avataaars
                                        style={{ width: 60, height: 60 }}
                                        topType={avatarConfig?.topType}
                                        hairColor={avatarConfig?.hairColor}
                                        skinColor={avatarConfig?.skinColor}
                                        eyeType={avatarConfig?.eyeType}
                                        clotheType={avatarConfig?.clotheType}
                                        clotheColor={avatarConfig?.clotheColor}
                                        mouthType={avatarConfig?.mouthType}
                                        accessoriesType={avatarConfig?.accessoriesType}
                                        facialHairType={type.value}
                                    />
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {type.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Tektur' }}>
                            Цвет фона
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption">Выбрать цвет:</Typography>
                                <input
                                    type="color"
                                    value={avatarConfig?.avatarBackground || '#FFFFFF'}
                                    onChange={(e) => handleAvatarChange('avatarBackground', e.target.value)}
                                    style={{ width: 40, height: 40, cursor: 'pointer' }}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ mx: 2, fontFamily: 'Tektur' }}>
                                или выбрать из списка:
                            </Typography>
                            {backgroundColors.map((color) => (
                                <Box
                                    key={color.value}
                                    sx={{
                                        cursor: 'pointer',
                                        border: avatarConfig?.avatarBackground === color.value ? '2px solid #374D45' : '2px solid transparent',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                    onClick={() => handleAvatarChange('avatarBackground', color.value)}
                                >
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            bgcolor: color.value,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avataaars
                                            style={{ width: 50, height: 50 }}
                                            topType={avatarConfig?.topType}
                                            hairColor={avatarConfig?.hairColor}
                                            skinColor={avatarConfig?.skinColor}
                                            eyeType={avatarConfig?.eyeType}
                                            clotheType={avatarConfig?.clotheType}
                                            clotheColor={avatarConfig?.clotheColor}
                                            mouthType={avatarConfig?.mouthType}
                                            accessoriesType={avatarConfig?.accessoriesType}
                                            facialHairType={avatarConfig?.facialHairType}
                                        />
                                    </Box>
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                                        {color.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#374D45',
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontFamily: 'Tektur'
                        }}
                        onClick={handleCloseModal}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default EditProfilePage;
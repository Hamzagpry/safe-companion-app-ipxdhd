
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from './Button';

export default function EntertainmentHub() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentStory, setCurrentStory] = useState<string | null>(null);

  const brainGames = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Match pairs of cards to improve memory',
      icon: 'grid' as keyof typeof Ionicons.glyphMap,
      difficulty: 'Easy',
      duration: '5-10 min'
    },
    {
      id: 'wordpuzzle',
      title: 'Word Puzzle',
      description: 'Find words in letter grids',
      icon: 'text' as keyof typeof Ionicons.glyphMap,
      difficulty: 'Medium',
      duration: '10-15 min'
    },
    {
      id: 'numbers',
      title: 'Number Games',
      description: 'Simple math and number patterns',
      icon: 'calculator' as keyof typeof Ionicons.glyphMap,
      difficulty: 'Easy',
      duration: '5-10 min'
    },
    {
      id: 'trivia',
      title: 'Trivia Quiz',
      description: 'Test your knowledge on various topics',
      icon: 'help-circle' as keyof typeof Ionicons.glyphMap,
      difficulty: 'Medium',
      duration: '10-20 min'
    }
  ];

  const musicTherapy = [
    {
      id: 'classical',
      title: 'Classical Relaxation',
      description: 'Soothing classical music for relaxation',
      icon: 'musical-notes' as keyof typeof Ionicons.glyphMap,
      duration: '30 min'
    },
    {
      id: 'nature',
      title: 'Nature Sounds',
      description: 'Calming sounds from nature',
      icon: 'leaf' as keyof typeof Ionicons.glyphMap,
      duration: '45 min'
    },
    {
      id: 'oldies',
      title: 'Golden Oldies',
      description: 'Music from the good old days',
      icon: 'radio' as keyof typeof Ionicons.glyphMap,
      duration: '60 min'
    },
    {
      id: 'meditation',
      title: 'Meditation Music',
      description: 'Peaceful music for meditation',
      icon: 'flower' as keyof typeof Ionicons.glyphMap,
      duration: '20 min'
    }
  ];

  const stories = [
    {
      id: 'adventure',
      title: 'Adventure Tales',
      description: 'Exciting stories of exploration and discovery',
      icon: 'map' as keyof typeof Ionicons.glyphMap,
      chapters: 12
    },
    {
      id: 'mystery',
      title: 'Mystery Stories',
      description: 'Intriguing mysteries to solve',
      icon: 'search' as keyof typeof Ionicons.glyphMap,
      chapters: 8
    },
    {
      id: 'romance',
      title: 'Classic Romance',
      description: 'Timeless love stories',
      icon: 'heart' as keyof typeof Ionicons.glyphMap,
      chapters: 15
    },
    {
      id: 'history',
      title: 'Historical Tales',
      description: 'Stories from different eras',
      icon: 'library' as keyof typeof Ionicons.glyphMap,
      chapters: 20
    }
  ];

  const tvRadioStations = [
    {
      id: 'news',
      title: 'Senior News',
      description: 'News tailored for seniors',
      icon: 'newspaper' as keyof typeof Ionicons.glyphMap,
      type: 'TV'
    },
    {
      id: 'cooking',
      title: 'Cooking Shows',
      description: 'Easy recipes and cooking tips',
      icon: 'restaurant' as keyof typeof Ionicons.glyphMap,
      type: 'TV'
    },
    {
      id: 'talkradio',
      title: 'Talk Radio',
      description: 'Engaging conversations and discussions',
      icon: 'chatbubbles' as keyof typeof Ionicons.glyphMap,
      type: 'Radio'
    },
    {
      id: 'oldmusic',
      title: 'Oldies Radio',
      description: 'Classic hits from your era',
      icon: 'radio' as keyof typeof Ionicons.glyphMap,
      type: 'Radio'
    }
  ];

  const handlePlayGame = (gameId: string) => {
    setCurrentGame(gameId);
    const game = brainGames.find(g => g.id === gameId);
    Alert.alert(
      `Starting ${game?.title}`,
      `Get ready for a fun brain exercise! This game will help improve your cognitive function.`,
      [
        { text: 'Start Game', onPress: () => console.log(`Starting game: ${gameId}`) },
        { text: 'Cancel', onPress: () => setCurrentGame(null) }
      ]
    );
  };

  const handlePlayMusic = (musicId: string) => {
    setMusicPlaying(!musicPlaying);
    const music = musicTherapy.find(m => m.id === musicId);
    Alert.alert(
      musicPlaying ? 'Stopping Music' : `Playing ${music?.title}`,
      musicPlaying ? 'Music stopped' : `Enjoy ${music?.duration} of relaxing music`,
      [{ text: 'OK' }]
    );
  };

  const handleReadStory = (storyId: string) => {
    setCurrentStory(storyId);
    const story = stories.find(s => s.id === storyId);
    Alert.alert(
      `${story?.title}`,
      `This collection has ${story?.chapters} chapters. Would you like me to read it aloud or display it on screen?`,
      [
        { text: 'Read Aloud', onPress: () => console.log(`Reading story aloud: ${storyId}`) },
        { text: 'Display Text', onPress: () => console.log(`Displaying story: ${storyId}`) },
        { text: 'Cancel', onPress: () => setCurrentStory(null) }
      ]
    );
  };

  const handleWatchListen = (stationId: string) => {
    const station = tvRadioStations.find(s => s.id === stationId);
    Alert.alert(
      `${station?.type}: ${station?.title}`,
      station?.description,
      [
        { text: `Start ${station?.type}`, onPress: () => console.log(`Starting ${station?.type}: ${stationId}`) },
        { text: 'Cancel' }
      ]
    );
  };

  const handleBookClub = () => {
    Alert.alert(
      'Virtual Book Club',
      'Join other seniors in discussing this month\'s book selection. Next meeting is Thursday at 2 PM.',
      [
        { text: 'Join Meeting', onPress: () => console.log('Joining book club meeting') },
        { text: 'View Book', onPress: () => console.log('Opening current book') },
        { text: 'Later' }
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Entertainment Hub</Text>
        
        {/* Brain Training Games */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Brain Training Games</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Keep your mind sharp with fun cognitive exercises
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {brainGames.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[
                  commonStyles.card,
                  {
                    width: '48%',
                    marginBottom: 12,
                    backgroundColor: currentGame === game.id ? colors.primary : colors.backgroundAlt,
                    borderWidth: 2,
                    borderColor: currentGame === game.id ? colors.primary : colors.border
                  }
                ]}
                onPress={() => handlePlayGame(game.id)}
              >
                <Ionicons 
                  name={game.icon} 
                  size={32} 
                  color={currentGame === game.id ? colors.background : colors.primary}
                  style={{ alignSelf: 'center', marginBottom: 8 }}
                />
                <Text style={[
                  commonStyles.text, 
                  { 
                    fontSize: 16, 
                    marginBottom: 4,
                    color: currentGame === game.id ? colors.background : colors.text
                  }
                ]}>
                  {game.title}
                </Text>
                <Text style={[
                  commonStyles.textSecondary, 
                  { 
                    fontSize: 12, 
                    textAlign: 'center',
                    color: currentGame === game.id ? colors.background : colors.textSecondary
                  }
                ]}>
                  {game.difficulty} • {game.duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Music Therapy */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Music Therapy</Text>
          
          {musicTherapy.map((music, index) => (
            <TouchableOpacity
              key={music.id}
              style={[
                commonStyles.row,
                {
                  paddingVertical: 12,
                  borderBottomWidth: index < musicTherapy.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border
                }
              ]}
              onPress={() => handlePlayMusic(music.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name={music.icon} size={24} color={colors.primary} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                    {music.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                    {music.description} • {music.duration}
                  </Text>
                </View>
              </View>
              <Ionicons 
                name={musicPlaying ? "pause" : "play"} 
                size={20} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive Storytelling */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Interactive Stories</Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {stories.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={[
                  commonStyles.card,
                  {
                    width: '48%',
                    marginBottom: 12,
                    backgroundColor: currentStory === story.id ? colors.accent : colors.backgroundAlt
                  }
                ]}
                onPress={() => handleReadStory(story.id)}
              >
                <Ionicons 
                  name={story.icon} 
                  size={28} 
                  color={currentStory === story.id ? colors.background : colors.primary}
                  style={{ alignSelf: 'center', marginBottom: 8 }}
                />
                <Text style={[
                  commonStyles.text, 
                  { 
                    fontSize: 16, 
                    marginBottom: 4,
                    color: currentStory === story.id ? colors.background : colors.text
                  }
                ]}>
                  {story.title}
                </Text>
                <Text style={[
                  commonStyles.textSecondary, 
                  { 
                    fontSize: 12, 
                    textAlign: 'center',
                    color: currentStory === story.id ? colors.background : colors.textSecondary
                  }
                ]}>
                  {story.chapters} chapters
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TV & Radio Streams */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>TV & Radio</Text>
          
          {tvRadioStations.map((station, index) => (
            <TouchableOpacity
              key={station.id}
              style={[
                commonStyles.row,
                {
                  paddingVertical: 12,
                  borderBottomWidth: index < tvRadioStations.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border
                }
              ]}
              onPress={() => handleWatchListen(station.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Ionicons name={station.icon} size={24} color={colors.primary} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.text, { textAlign: 'left', marginBottom: 4 }]}>
                    {station.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { textAlign: 'left', fontSize: 14 }]}>
                    {station.description}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {station.type}
                </Text>
                <Ionicons name="play" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Virtual Book Club */}
        <View style={[commonStyles.card, { alignItems: 'center' }]}>
          <Ionicons name="library" size={48} color={colors.primary} style={{ marginBottom: 16 }} />
          <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>Virtual Book Club</Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16, textAlign: 'center' }]}>
            Connect with other book lovers and discuss great literature
          </Text>
          <Button
            text="Join Book Club"
            onPress={handleBookClub}
            style={{ backgroundColor: colors.primary, width: '100%' }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

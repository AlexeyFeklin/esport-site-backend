import Team from '../models/Team.js';

export const createTeam = async (req, res) => {
  try {
    const { name, members, tournamentId } = req.body;

    const newTeam = await Team.create({
      name,
      members,
      tournamentId,
    });

    res.status(201).json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
};

export const getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await Team.find({ tournamentId }).populate('members');

    if (teams.length === 0) {
      return res.status(404).json({ error: 'No teams found for this tournament' });
    }

    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get teams by tournament' });
  }
};

export const addMemberToTeam = async (req, res) => {
  try {
    const { teamId, memberId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.members.push(memberId);
    await team.save();

    res.status(200).json({ message: 'Member added to team successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member to team' });
  }
};

export const removeMemberFromTeam = async (req, res) => {
  try {
    const { teamId, memberId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.members = team.members.filter((member) => member != memberId);
    await team.save();

    if (team.members.length === 0) {
      await Team.findByIdAndDelete(team._id);
      return res.status(200).json({ message: 'Member removed from team successfully and team deleted' });
    }

    res.status(200).json({ message: 'Member removed from team successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove member from team' });
  }
};

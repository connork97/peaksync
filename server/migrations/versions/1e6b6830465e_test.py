"""test

Revision ID: 1e6b6830465e
Revises: 112288aec481
Create Date: 2023-05-23 15:40:53.468276

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e6b6830465e'
down_revision = '112288aec481'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('signups', schema=None) as batch_op:
        batch_op.add_column(sa.Column('session_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_signups_session_id_sessions'), 'sessions', ['session_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('signups', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_signups_session_id_sessions'), type_='foreignkey')
        batch_op.drop_column('session_id')

    # ### end Alembic commands ###
